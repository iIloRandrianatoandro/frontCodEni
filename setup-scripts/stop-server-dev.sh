#!/usr/bin/bash

# shut down all running services related to this dev application
docker-compose -f docker-compose.dev.yml down

# remove all images related to this dev application
docker rmi -f judgmentapp-dev:1.0
