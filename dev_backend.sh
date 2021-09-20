#!/bin/bash
docker-compose up -d
yarn migrate
yarn prisma db seed
