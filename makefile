BINARY_NAME=goweb
MAIN_PATH=cmd/GoWeb/main.go

build:
	go build -o ${BINARY_NAME} ${MAIN_PATH}

run: clean ts sass
	go run ${MAIN_PATH}

clean:
	go clean
	rm -f ${BINARY_NAME}
	rm -rf web/assets/css
	rm -rf web/assets/js

test:
	go test ./...

fmt:
	go fmt ./...

vet:
	go vet ./...

lint:
	golangci-lint run

ts:
	tsc --project web/assets/ts/tsconfig.json --outDir web/assets/js --sourceMap

sass:
	sass web/assets/sass:web/assets/css --style compressed --update

deps:
	@go mod tidy
	@go mod vendor
	@go mod download
	@go mod verify

.PHONY: build run clean test fmt vet lint ts sass deps

# <3
