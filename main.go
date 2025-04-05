package main

import (
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

func main() {
	fs := http.FileServer(http.Dir("."))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Clean(r.URL.Path)
		if path == "/" {
			http.ServeFile(w, r, "index.html")
			return
		}
		if strings.HasPrefix(path, "/pages/") {
			http.ServeFile(w, r, path[1:])
			return
		}
		fs.ServeHTTP(w, r)
	})
	var Addr string
	fmt.Scanln("Type an address to serve from (E.g. 127:0.0.1:8080):", Addr)
	err := http.ListenAndServe(Addr, nil)
	if err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}
