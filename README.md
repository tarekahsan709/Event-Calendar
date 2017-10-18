# Event Calendar


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [node-gyp](https://github.com/nodejs/node-gyp#installation)


* You must full fill the Prerequisites to run the application. Please make sure you have install all of them correctly and specially node-gyp.

### Run

1. Clone the project from - https://github.com/tarekahsan709/Event-Calendar

2. Run `npm install` to install server dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

 In case you face
  ##### Error: Cannot find module './build/bindings/iltorb.node'
  please run `cd node_modules/iltorb && npm i && cd ../.. ` and then `gulp serve`in case you got

##### If you still face problem like can not find module node-zopfli please check node-gyp installation link carefully.

## Build & evelopment

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `test:server:coverage` will show test coverage

Running `test:server` will run the server side test code.

## Descriptions
The project is mainly consist of two part. One is client which hold the frontend code and another is server which hold the backend code. In client AngularJS, Html, Css, Bootstrap, Ui-bootstrap technology is used. Also some other library  like
for calender view a Angular bootstrap calender , ui-router for routing, ng-resource for interact with RESTful server-side data sources.
Server side is build on node js platform. Express js , Mongodb, Mongoose technology is used. I have used some es6 feature both client and sever side. For browser support babel is used to. Also gulp and web pack is used as a build tool. For linting eslint is used.
Some unit test and integration test is also written for backend using Mocha, Chai and Sinon.
Each cell of the calender will show only two event name. If it has more then two event , the cell will show the number of event it's containing.
to see those events you have to click the cell. It will expand and show those events. Event title also show maximum 20 character on cell. It it's more then 20 character it will show as ....
A seed data is provided, If you don't want to seed data. please false seed config. it's located on server/config/environment/development.js