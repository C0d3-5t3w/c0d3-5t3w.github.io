MAIN_PATH=main.go

run: clean deps php ts sass
	go run ${MAIN_PATH}

clean:
	go clean
	rm -rf assets/css
	rm -rf assets/js
	rm -rf tsconfig.json
	rm -rf package-lock.json
	rm -rf pages/*.html
	rm -rf *.html

php:
	find . -type f -path "./pages/*.php" | sort
	find . -type f -path "./*.php" | sort | \
	  xargs -I {} sh -c '\
	    file="{}"; \
	    if [ "$${file##*.}" = "php" ]; then \
	      dir=$$(dirname "$$file"); \
	      html_file="$$dir/$$(basename "$${file%.php}.html")"; \
	      php "$$file" > "$$html_file"; \
	    fi'
	find . -type f -path "./pages/*.php" -exec sh -c '\
	  for file; do \
	    if [ "$${file##*.}" = "php" ]; then \
	      dir=$$(dirname "$$file"); \
	      html_file="$$dir/$$(basename "$${file%.php}.html")"; \
	      php "$$file" > "$$html_file"; \
	    fi; \
	  done' sh {} +
	find . -type f -name "*.html" | grep -v "node_modules" | sort

ts:
	tsc --init
	tsc --project tsconfig.json --outDir assets/js --sourceMap

sass:
	sass assets/sass:assets/css --style compressed --update

deps:
	@go mod tidy
	@go mod vendor
	@go mod download
	@go mod verify

.PHONY: run clean php ts sass deps

# <3
