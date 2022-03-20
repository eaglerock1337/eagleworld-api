VERSION = 0.1.0

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
	docker container stop eagleworld-core-api

.PHONY: build
build: ## build the bot's Docker image
	docker image build --tag eaglerock/eagleworld-core-api:${VERSION} .
	docker image tag eaglerock/eagleworld-core-api:${VERSION} eaglerock/eagleworld-core-api:latest

.PHONY: build-micro
build-micro: ## build the bot's Docker image for microk8s
	docker image build --tag localhost:32000/eagleworld-core-api:${VERSION} .
	docker image push localhost:32000/eagleworld-core-api:${VERSION}

.PHONY: promote-micro
promote-micro: ## promote the image to local microk8s repsository
	docker image tag localhost:32000/eagleworld-core-api:${VERSION} localhost:32000/eagleworld-core-api:stable
	docker image push localhost:32000/eagleworld-core-api:${VERSION}

.PHONY: push
push: ## push the version to Docker hub
	docker image push eaglerock/eagleworld-core-api:${VERSION}
	docker image push eaglerock/eagleworld-core-api:latest

.PHONY: promote
promote: ## promote the image to stable
	docker image tag eaglerock/eagleworld-core-api:${VERSION} eaglerock/eagleworld-core-api:stable
	docker image push eaglerock/eagleworld-core-api:${VERSION}

.PHONY: run
run: ## run the bot inside Docker
	docker container run -d -p 4000:4000 --rm --name eagleworld-core-api eaglerock/eagleworld-core-api:${VERSION}

.PHONY: log
log: ## display the Docker container's logs and save to a logfile
	docker container logs -f eagleworld-core-api | tee eagleworld-core-api.log

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
