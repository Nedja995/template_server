## Template Express-Typeorm-Swagger Server
### REST server for [template_nextjs](https://github.com/Nedja995/template_nextjs)

### Started with [node-starter](https://github.com/mravinale/node-starter) 
This starter has good multilayered architecture, auto-generated docs and swagger-ui but also <b>problems to make it work in production env</b>

## Start application

 * start with dev database `yarn start:dev`
 * start with local database `yarn start:local dbname={dbname} dbusername={dbusername} dbpassword={dbpassword}`

### API Swagger documentation
* `<url>/api-docs`
### Endpoint URL?
* `<url>/v1`

## Commands
* **instalation:** `yarn install`
* **dev:** `yarn start` *build tsoa routes, swagger definitions and starts the server on development mode listening to file changes (swagger definition changes will require a manual restart)*
* **test:** `yarn test` *unit and integration tests*
* **build:** `yarn build` *production build*
* **prod:** `yarn start:prod` *starts the server on production mode*
* **local:** `yarn start:local` *lets the user sets the database via arguments*
   * **required arguments:**
      * **dbname=LOCAL_DBNAME**
      * **dbusername=LOCAL_USERNAME**
      * **dbpassword=LOCAL_PASSWORD**
  * **default arguments (can be overriden):**
      * **dbhost=localhost**
      * **dbport=3306**
      * **dbdialect=postgres**
* **use `ormconfig.json` instead `SQLDbConnection.ts` configurations for commands:**
* * **make migration** `typeorm migration:create -n ` *make typeorm migration*
* * **run migration** `yarn migration:run`
* * **sync db** `yarn database:sync` *create missing tables*

# Tech Stack
* This project is a seed for building a **node.js** api. It includes the following features:
* * [tsoa](https://www.npmjs.com/package/tsoa) `typescript`
* * [inversify](https://www.npmjs.com/package/inversify) `inversion of controll / dependency injection`
* * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
* * [typeorm](https://www.npmjs.com/package/typeorm) `SQL ORM`
* * [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai), [supertest](https://www.npmjs.com/package/supertest), [sinon](https://www.npmjs.com/package/sinon) `unit and integration testing`

## Scaffolding
* config `express server, DB connection, Logger, etc`
  * env `.env files`
* controllers `routes configuration`
* persistance `data abstraction layers`
  * Entities `classes and interfaces representing entities.`
* services `business logic to be used primary by controllers`
  * Dtos `Data transfer objects, to decouple domain from Rest resources`
* utils
* tests

