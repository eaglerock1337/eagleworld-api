VERSION = 0.0.1

.PHONY: default
default: help

# generate help info from comments: thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help: ## help information about make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: start
start: build run ## ALIAS: build, run

.PHONY: restart
restart: stop build run ## ALIAS: stop, build, run

.PHONY: stop
stop: ## stop the Docker container
	docker stop eagleworld-core-api

.PHONY: build
build: ## build the bot's Docker image
	docker build --tag eagleworld-core-api:${VERSION} .

.PHONY: run
run: ## run the bot inside Docker
	docker run -d -p 4000:4000 --rm --name eagleworld-core-api eagleworld-core-api:${VERSION}

.PHONY: log
log: ## display the Docker container's logs and save to a logfile
	docker logs -f eagleworld-core-api | tee eagleworld-core-api.log

# .PHONY: env
# env: ## set up a local development environment
# 	pip install pipenv
# 	pipenv install --dev

# .PHONY: local
# local: ## run the bot locally
# 	pipenv run python mr-poopybutthole.py

# .PHONY: dev
# dev: ## run the bot locally in development mode
# 	pipenv run python mr-poopybutthole.py --dev

# .PHONY: test
# test: ## run pytest unit tests
# 	@echo "Not done yet!"

# .PHONY: lint
# lint: ## lint all code with black
# 	black .
