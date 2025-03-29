use actix_web::{web, App, HttpServer, HttpResponse, HttpRequest, Error};
use actix_files::NamedFile;
use std::path::{Path, PathBuf};
use std::process::Command;
use actix_web::main;

async fn serve_static(req: HttpRequest) -> Result<NamedFile, Error> {
    let path: PathBuf = req.path().trim_start_matches('/').into();
    let file_path = Path::new(".").join(path);
    Ok(NamedFile::open(file_path)?)
}

async fn serve_php(req: HttpRequest) -> HttpResponse {
    let path = req.path().trim_start_matches('/');
    
    let php_path = if path.is_empty() || path == "index.html" {
        "index.php"
    } else {
        &format!("/{}", path)
    };

    execute_php(php_path)
}

async fn serve_php_with_path(path: &str) -> HttpResponse {
    let php_path = format!("/{}", path);
    execute_php(&php_path)
}

fn execute_php(php_path: &str) -> HttpResponse {
    match Command::new("php")
        .arg("-f")
        .arg(php_path)
        .output() {
            Ok(output) => {
                if output.status.success() {
                    HttpResponse::Ok()
                        .content_type("text/html; charset=utf-8")
                        .body(String::from_utf8_lossy(&output.stdout).to_string())
                } else {
                    let error_msg = String::from_utf8_lossy(&output.stderr).to_string();
                    eprintln!("PHP Error: {}", error_msg);
                    HttpResponse::InternalServerError()
                        .body(format!("PHP execution error: {}", error_msg))
                }
            },
            Err(e) => {
                eprintln!("Failed to execute PHP: {}", e);
                HttpResponse::InternalServerError()
                    .body(format!("Failed to execute PHP: {}", e))
            }
        }
}

async fn handle_request(req: HttpRequest) -> HttpResponse {
    let path = req.path();
    
    if path.ends_with(".php") || path == "/" || path.ends_with("/") {
        serve_php(req).await
    } else {
        match serve_static(req.clone()).await {
            Ok(file) => file.into_response(&req),
            Err(_) => {
                if path.ends_with(".html") {
                    let php_path = path.trim_start_matches('/').replace(".html", ".php");
                    serve_php_with_path(&php_path).await
                } else {
                    let directory_path = if path.ends_with("/") {
                        format!("{}index.php", path.trim_start_matches('/'))
                    } else {
                        format!("{}/index.php", path.trim_start_matches('/'))
                    };
                    
                    serve_php_with_path(&directory_path).await
                }
            }
        }
    }
}

#[main]
async fn main() -> std::io::Result<()> {
    println!("Starting server at http://localhost:8080");
    
    HttpServer::new(|| {
        App::new()
            .default_service(web::to(handle_request))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
