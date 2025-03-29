package main

import (
	"html/template"
	"log"
	"net/http"
	"net/http/cgi"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

var PhpCgi = "/opt/homebrew/bin/php-cgi"

const (
	TemplateDir = "pages"
	AssetDir    = "assets"
	ServeLoc    = ":8080"
)

func renderTemplate(w http.ResponseWriter, tmpl string, data interface{}) {
	tmplPath := filepath.Join(TemplateDir, tmpl)

	if _, err := os.Stat(tmplPath); os.IsNotExist(err) {
		http.Error(w, "template file not found", http.StatusNotFound)
		log.Println("template not found:", tmplPath)
		return
	}

	if strings.HasSuffix(tmpl, ".php") {
		handlePhpFile(w, tmplPath)
		return
	} else if strings.HasSuffix(tmpl, ".html") {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
	}

	t, err := template.ParseFiles(tmplPath)
	if err != nil {
		http.Error(w, "error rendering template", http.StatusInternalServerError)
		log.Println("template error:", err)
		return
	}

	err = t.Execute(w, data)
	if err != nil {
		http.Error(w, "error executing template", http.StatusInternalServerError)
		log.Println("template execution error:", err)
	}
}

func handlePhpFile(w http.ResponseWriter, phpFile string) {
	if _, err := os.Stat(PhpCgi); os.IsNotExist(err) {
		http.Error(w, "PHP-CGI not found", http.StatusInternalServerError)
		log.Println("PHP-CGI not found at:", PhpCgi)
		return
	}

	absPath, err := filepath.Abs(phpFile)
	if err != nil {
		http.Error(w, "Error resolving PHP file path", http.StatusInternalServerError)
		log.Println("Path resolution error:", err)
		return
	}

	if _, err := os.Stat(absPath); os.IsNotExist(err) {
		http.Error(w, "PHP file not found", http.StatusNotFound)
		log.Println("PHP file not found:", absPath)
		return
	}

	log.Printf("Executing PHP via CGI. Script: %s", absPath)

	handler := &cgi.Handler{
		Path: PhpCgi,
		Root: "/",
		Dir:  filepath.Dir(absPath),
		Env: []string{
			"SCRIPT_FILENAME=" + absPath,
			"REDIRECT_STATUS=200",
			"QUERY_STRING=",
		},
	}

	filename := filepath.Base(phpFile)

	r, err := http.NewRequest("GET", "/"+filename, nil)
	if err != nil {
		http.Error(w, "Error creating PHP request", http.StatusInternalServerError)
		log.Println("PHP request creation error:", err)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	handler.ServeHTTP(w, r)
}

func handlePhp(w http.ResponseWriter, r *http.Request) bool {
	if strings.HasSuffix(r.URL.Path, ".php") {
		filename := filepath.Base(r.URL.Path)
		phpFilePath := filepath.Join(TemplateDir, filename)

		absPath, err := filepath.Abs(phpFilePath)
		if err != nil {
			http.Error(w, "Error resolving PHP file path", http.StatusInternalServerError)
			log.Println("Path resolution error:", err)
			return true
		}

		log.Printf("PHP request for: %s, using path: %s", r.URL.Path, absPath)

		if _, err := os.Stat(absPath); os.IsNotExist(err) {
			http.Error(w, "PHP file not found", http.StatusNotFound)
			log.Printf("PHP file not found: %s", absPath)
			return true
		}

		handler := &cgi.Handler{
			Path: PhpCgi,
			Root: "/",
			Dir:  filepath.Dir(absPath),
			Env: []string{
				"SCRIPT_FILENAME=" + absPath,
				"REDIRECT_STATUS=200",
				"QUERY_STRING=" + r.URL.RawQuery,
				"REQUEST_URI=" + r.URL.RequestURI(),
				"DOCUMENT_ROOT=" + filepath.Dir(filepath.Dir(absPath)),
			},
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")

		log.Printf("Executing PHP via CGI: %s", absPath)
		handler.ServeHTTP(w, r)
		return true
	}
	return false
}

func handler1(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	log.Printf("Request for path: %s\n", path)

	if path == "/" || path == "/index.php" {
		log.Println("Serving index.php")
		data := map[string]string{"title": "Home"}
		renderTemplate(w, "index.php", data)
		return
	}

	if handlePhp(w, r) {
		return
	}
}

func handler2(w http.ResponseWriter, r *http.Request) {
	if handlePhp(w, r) {
		return
	}

	log.Println("Serving pictures.php")
	data := map[string]string{"title": "Pictures"}
	renderTemplate(w, "pictures.php", data)
}

func handler3(w http.ResponseWriter, r *http.Request) {
	if handlePhp(w, r) {
		return
	}

	log.Println("Serving FlappyZig.php")
	data := map[string]string{"title": "FlappyZig"}
	renderTemplate(w, "FlappyZig.php", data)
}

func handler4(w http.ResponseWriter, r *http.Request) {
	if handlePhp(w, r) {
		return
	}

	log.Println("Serving particles.php")
	data := map[string]string{"title": "Particles"}
	renderTemplate(w, "particles.php", data)
}

func handler5(w http.ResponseWriter, r *http.Request) {
	if handlePhp(w, r) {
		return
	}

	log.Println("Serving advice.php")
	data := map[string]string{"title": "Advice"}
	renderTemplate(w, "advice.php", data)
}

func handler6(w http.ResponseWriter, r *http.Request) {
	if handlePhp(w, r) {
		return
	}

	log.Println("Serving links.php")
	data := map[string]string{"title": "Links"}
	renderTemplate(w, "links.php", data)
}

func handler7(w http.ResponseWriter, r *http.Request) {
	if handlePhp(w, r) {
		return
	}

	log.Println("Serving recipes.php")
	data := map[string]string{"title": "Recipes"}
	renderTemplate(w, "recipes.php", data)
}

func main() {
	if _, err := os.Stat(PhpCgi); os.IsNotExist(err) {
		log.Printf("PHP-CGI not found at %s. Checking other common locations...", PhpCgi)

		commonLocations := []string{
			"/usr/bin/php-cgi",
			"/usr/local/bin/php-cgi",
			"/opt/homebrew/bin/php-cgi",
			"/opt/homebrew/opt/php/bin/php-cgi",
		}

		found := false
		for _, loc := range commonLocations {
			if _, err := os.Stat(loc); err == nil {
				PhpCgi = loc
				found = true
				log.Printf("Found PHP-CGI at %s", PhpCgi)
				break
			}
		}

		if !found {
			log.Fatalf("PHP-CGI not found in common locations. Please install PHP or specify the correct path.")
		}
	}

	cmd := exec.Command(PhpCgi, "-v")
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("Warning: PHP-CGI test failed: %v", err)
		log.Printf("Output: %s", string(output))
		log.Println("PHP might not work correctly.")
	} else {
		log.Printf("PHP-CGI version test successful: %s", strings.Split(string(output), "\n")[0])
	}

	os.MkdirAll(AssetDir, 0755)

	sassCmd := exec.Command("sass", filepath.Join("web", "assets", "sass")+":"+filepath.Join("web", "assets", "css"), "--style", "compressed")
	sassCmd.Stdout = os.Stdout
	sassCmd.Stderr = os.Stderr
	log.Println("Running sass compiler...")
	err = sassCmd.Run()
	if err != nil {
		log.Println("Warning: sass compilation failed:", err)
		log.Println("You may need to install sass with: npm install -g sass")
	}

	fs := http.FileServer(http.Dir(AssetDir))

	cssHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Asset request: %s", r.URL.Path)
		if strings.HasSuffix(r.URL.Path, ".css") {
			w.Header().Set("Content-Type", "text/css; charset=utf-8")
		} else if strings.HasSuffix(r.URL.Path, ".js") {
			w.Header().Set("Content-Type", "application/javascript; charset=utf-8")
		}
		fs.ServeHTTP(w, r)
	})

	http.Handle("/assets/", http.StripPrefix("/assets/", cssHandler))

	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir(filepath.Join(AssetDir, "css")))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir(filepath.Join(AssetDir, "js")))))
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir(filepath.Join(AssetDir, "images")))))

	http.HandleFunc("/", handler1)
	http.HandleFunc("/pictures.php", handler2)
	http.HandleFunc("/FlappyZig.php", handler3)
	http.HandleFunc("/particles.php", handler4)
	http.HandleFunc("/advice.php", handler5)
	http.HandleFunc("/links.php", handler6)
	http.HandleFunc("/recipes.php", handler7)

	log.Println("Server started on", ServeLoc)
	log.Println("Serving templates from", TemplateDir)
	log.Println("Serving assets from", AssetDir)
	log.Println("Using PHP-CGI at", PhpCgi)

	err = http.ListenAndServe(ServeLoc, nil)
	if err != nil {
		log.Fatal("server error:", err)
	}
}
