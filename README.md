# 5C Assignment Backend

## Tech

* Node.js
* Express
* PostgreSql

## Installation

Install the dependencies and devDependencies and start the server.
```sh
$ cd 5c
$ npm install
$ node ./bin/www
````


## APIS

### 1. github

It will take an endpoint in payload and fetch data from that endpoint and save it into Postgres database(name: repository) in table repos.

**URL** : `http://localhost:8000/github`

**Method** : `POST`
**Body** : {
	"url": "https://api.github.com/users/mralexgray/repos"
}

### 2. github/:id

Get the saved data by passing the “id”.

**URL** : `http://localhost:3000/github/:id`

**Method** : `GET`


#### Notes

Saving in postgreSql is a create or update method (i.e calling API 1 multiple times do not create more rows if there is already a row present with same “id”)


