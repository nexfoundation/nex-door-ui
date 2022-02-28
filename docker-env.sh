#!/bin/bash

docker run -it -p 8080:8080 --rm -v $PWD:/app node:14.17.0-alpine3.13 sh
