# envs to set before use this script
DATABASE_URL?=
DEVELOP?=1
DOCKER_PASS?=
DOCKER_USER?=
TARGET?=0.1
BASE?=$(shell echo "${TARGET}" | sed "s/\([0-9]\)\.\([0-9]\)\.\(.*\)/\1.\2/g" )
# below vars are used internally
BUILD_OPTIONS?=
CMD?=donor_reporting_portal
CONTAINER_NAME?=donor_reporting_portal-${TARGET}
ORGANIZATION=unicef
IMAGE_NAME=donor-reporting-portal-frontend
DOCKER_IMAGE_NAME?=${ORGANIZATION}/${IMAGE_NAME}
DOCKER_IMAGE?=${DOCKER_IMAGE_NAME}:${TARGET}
DOCKERFILE?=Dockerfile
RUN_OPTIONS?=
PIPENV_ARGS?=
PORTS=

help:
	@echo "dev                  build dev image (based on local code)"
	@echo "build                build production image (based on tag ${TARGET})"
	@echo "release              release tag ${TARGET} on docker hub"
	@echo "run                  run ${DOCKER_IMAGE} locally"



.build:
	cd .. && docker build \
			${BUILD_OPTIONS} \
			--build-arg BASE_IMAGE=${BASE} \
			--build-arg DEVELOP=${DEVELOP} \
			--build-arg VERSION=${TARGET} \
			-t ${DOCKER_IMAGE} \
			-f docker/Dockerfile .
	docker tag ${DOCKER_IMAGE_NAME}:${TARGET} ${DOCKER_IMAGE_NAME}:dev
	docker images | grep ${DOCKER_IMAGE_NAME}

build-dev:
	TARGET=dev $(MAKE) .build test

build:
	$(MAKE) .build test

.run:
	cd .. && docker run \
	 		--rm \
			${RUN_OPTIONS} \
			${DOCKER_IMAGE} \
			${CMD}

# local:
# 	RUN_OPTIONS="-v ${PWD}/..:/code -e PYTHONPATH=/code -it" \
# 	CMD="/bin/bash" \
# 	$(MAKE) .run

release:
	@echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin
	docker tag ${DOCKER_IMAGE_NAME}:${TARGET} ${DOCKER_IMAGE_NAME}:dev
	docker push ${DOCKER_IMAGE_NAME}:${TARGET}
	docker push ${DOCKER_IMAGE_NAME}:dev

# run:
# 	RUN_OPTIONS="-p 8000:8000" \
# 		ABSOLUTE_BASE_URL=${ABSOLUTE_BASE_URL} \
# 		$(MAKE) .run


# test:
# 	RUN_OPTIONS="-e DEBUG=0 \
# 				 -e X_FRAME_OPTIONS=DENY \
# 				 -e SESSION_COOKIE_SECURE=1 \
# 				 -e CSRF_COOKIE_SECURE=1 \
# 				 -e SECURE_HSTS_PRELOAD=1 \
# 				 -e SECURE_SSL_REDIRECT=1" \
# 	CMD='bash -c "touch /var/donor_reporting_portal/.touch && django-admin check --deploy "' \
# 	$(MAKE) .run

