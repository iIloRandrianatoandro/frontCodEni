#!/usr/bin/bash

# shut down all running services related to this prod application
docker-compose -f docker-compose.prod.yml down

# remove all images related to this prod application
docker rmi -f judgmentapp-prod:1.0
