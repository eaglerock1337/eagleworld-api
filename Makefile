MODULE = $(shell go list -m)
VERSION ?= $(shell git describe --tags --always --dirty --match=v* 2> /dev/null || echo "1.0.0")
PACKAGES := $(shell go list ./... | grep -v /vendor/)
LDFLAGS := -ldflags "-X github.com/pelotoncycle/pasm-dynamo-handler/internal/config.Version=${VERSION}"

CONFIG_FILE ?= ./config/local.yml
APP_DSN ?= $(shell sed -n 's/^dsn:[[:space:]]*"\(.*\)"/\1/p' $(CONFIG_FILE))

PID_FILE := './.pid'
FSWATCH_FILE := './fswatch.cfg'

.PHONY: default
default: help

# generate help info from comments: thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help: ## help information about make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: test-local
test-local: ## run tests in local environment
	@PASM_CONFIG=`pwd`/config/test.yml ginkgo -r -cover -coverprofile=coverage.out -outputdir=. -covermode=count

.PHONY: test
test: ## run tests in docker test environment
	@docker compose up --abort-on-container-exit --exit-code-from app-node

.PHONY: test-cover
test-cover: test ## run unit tests and show test coverage information
	go tool cover -html=coverage.out

.PHONY: run
run: ## run the API server
	go run ${LDFLAGS} cmd/pasm-dynamo-handler/main.go

.PHONY: run-restart
run-restart: ## restart the API server
	@pkill -P `cat $(PID_FILE)` || true
	@printf '%*s\n' "80" '' | tr ' ' -
	@echo "Source file changed. Restarting server..."
	@go run ${LDFLAGS} cmd/pasm-dynamo-handler/main.go & echo $$! > $(PID_FILE)
	@printf '%*s\n' "80" '' | tr ' ' -

run-live: ## run the API server with live reload support (requires fswatch)
	@go run ${LDFLAGS} cmd/pasm-dynamo-handler/main.go & echo $$! > $(PID_FILE)
	@fswatch -x -o --event Created --event Updated --event Renamed -r internal pkg cmd config controllers routers models jon_is_awesome | xargs -n1 -I {} make run-restart

.PHONY: build
build:  ## build the API server binary
	CGO_ENABLED=0 go build ${LDFLAGS} -a -o pasm-dynamo-handler $(MODULE)/cmd/pasm-dynamo-handler

.PHONY: build-docker
build-docker: ## build the API server as a docker image
	docker build -f cmd/pasm-dynamo-handler/Dockerfile -t pasm-dynamo-handler .

.PHONY: clean
clean: ## remove temporary files
	rm -rf pasm-dynamo-handler coverage.out coverage-all.out docs

.PHONY: version
version: ## display the version of pasm-dynamo-handler
	@echo $(VERSION)

.PHONY: lint
lint: ## run golint on all Go package
	@golint $(PACKAGES)

.PHONY: fmt
fmt: ## run "go fmt" on all Go packages
	@go fmt $(PACKAGES)

.PHONY: docs
docs: install_tools # generate swagger docs
	@swag init -g cmd/pasm-dynamo-handler/main.go

.PHONY: all
all: clean docs build ## clean then create docs and build

.PHONY: install_tools
install_tools: ## install required development tools
	@go get -u github.com/swaggo/swag/cmd/swag ;\
	go get -u github.com/onsi/ginkgo/ginkgo ;\
	go get -u github.com/onsi/gomega

# docker-compose up --abort-on-container-exit --exit-code-from app-node
