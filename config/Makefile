

help:
	@echo "build-dev                  build dev image (based on local code)"
	@echo "release-dev             build production image and push as dev tag to docker hub"

rm-container:
	@docker ps -a | grep frontend:dev |  awk '{ print $1 }'| xargs -I {} docker rm {}

rm-image:
	@docker rmi unicef/donor-reporting-portal-frontend:dev --force

build:
	cd .. && docker build \
			-t unicef/donor-reporting-portal-frontend .
	docker tag unicef/donor-reporting-portal-frontend:latest unicef/donor-reporting-portal-frontend:dev

push:
	docker push unicef/donor-reporting-portal-frontend:dev

build-dev:
	cd .. && docker build \
		-t unicef/donor-reporting-portal-frontend -f ./Dockerfile-dev .
	docker tag unicef/donor-reporting-portal-frontend:latest unicef/donor-reporting-portal-frontend:dev

release-dev:
	$(MAKE) rm-container
	$(MAKE) build
	$(MAKE) push

