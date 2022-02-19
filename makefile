PWD			:= $(shell pwd)
PHP			:= appocore_api_php

# DO NOT USE IN PROD

up:
	@docker-compose up --build -d --force-recreate
	@cp $(PWD)/.env.example $(PWD)/.env

	@chmod 777 $(PWD)/storage


