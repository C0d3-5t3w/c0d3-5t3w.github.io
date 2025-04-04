MAIN_PATH=main.go

run: clean ts sass
	go run ${MAIN_PATH}

clean:
	go clean
	rm -rf web/assets/css
	rm -rf web/assets/js

ts:
	tsc --project web/assets/ts/tsconfig.json --outDir web/assets/js --sourceMap

sass:
	sass web/assets/sass:web/assets/css --style compressed --update

deps:
	@go mod tidy
	@go mod vendor
	@go mod download
	@go mod verify

.PHONY: run clean ts sass deps

# <3
