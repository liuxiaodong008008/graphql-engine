SHELL := bash -e -u -o pipefail

# default target
.PHONY: help
## help: prints help message
help:
	@echo "Usage:"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

include ./scripts/make/build.mk
include ./scripts/make/lint.mk
include ./scripts/make/test-infrastructure.mk
include ./scripts/make/tests.mk
include ./scripts/make/legacy-tests.mk
include ./scripts/make/ghcid.mk

build-docker-image: ./dist-newstyle/build/x86_64-linux/ghc-8.10.7/graphql-engine-1.0.0/x/graphql-engine/opt/build/graphql-engine/graphql-engine /bin/graphql-engine console/static/dist/main.js
	docker build -t liuxiaodong008008/graphql-engine:v2.9.0 .
