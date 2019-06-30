#!/bin/bash

if [ $# !=  4 ] ; then

#show how to use script
echo "usage  ./docker-deploy.sh ARTIFACTID  PORT REGISTRY_push  TAG "

else

if [  "$(docker ps -aq -f name=$1)" ]; then

        # cleanup
        docker container stop "$1"
        docker container rm  -f "$1"

        # run your container
        docker run -d -p "$2:$2" -v /k8s/data/exports:/usr/share/nginx/html/exports --name "$1"   "$3/$4"

else
        # run your container
        docker run -d -p "$2:$2" -v /k8s/data/exports:/usr/share/nginx/html/exports --name "$1"   "$3/$4"
fi


fi
