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

1. Clone the project

2. Run `npm install` to install server dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

 In case you face
  ##### Error: Cannot find module './build/bindings/iltorb.node'
  please run `cd node_modules/iltorb && npm i && cd ../.. ` and then `gulp serve`in case you got

##### If you still face problem like can not find module node-zopfli please check node-gyp installation link carefully.

## Build & evelopment

Run `gulp build` for building and `gulp serve` for preview.

If `gulp build` show this error
 `Error: spawn /media/nazmul/Dev/Event-Calendar/node_modules/optipng-bin/vendor/optipng ENOENT
    at exports._errnoException (util.js:1028:11)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:193:32)
    at onErrorNT (internal/child_process.js:359:16)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickDomainCallback (internal/process/next_tick.js:122:9)
`

please run `npm uninstall gulp-imagemin``npm install gulp-imagemin`  then run `gulp build` for building and `gulp serve` for preview.


## Testing

Running `test:server:coverage` will show test coverage

Running `test:server` will run the server side test code.

## Descriptions
The project is mainly consist of two part. One is client which hold the frontend code and another is server which hold the backend code. In client AngularJS, Html, Css, Bootstrap, Ui-bootstrap technology has used. Also some other library  like
for calender view a Angular bootstrap calender , ui-router for routing, ng-resource for interact with RESTful server-side data sources.
Server side is build on node js platform. Express js , Mongodb, Mongoose technology is used. I have used some javascript es6 feature both client and sever side. For browser support babel has used to. Also gulp and webpack has used as a build tool. For linting eslint has used.
Some unit test and integration test is also written for backend using Mocha, Chai and Sinon.
Each cell of the calender will show only two event name. If it has more then two event , the cell will show the number of event it's containing.
to see all events you have to click the cell. It will expand and show those events. Event title also show maximum 20 character on cell. It it's more then 20 character it will show as ....
A seed data is provided, If you don't want to seed data. please false the seed config. it's located on server/config/environment/development.js

## Thought process
After reading the requirement , first I tried to identify possible difficulty I may face to build this project.Then try to solve those difficulty as a general purpose also at the meantime start to build the project basic skeleton.
To build the project I need a good well documented angular calender library. After searching and reading about some of library. I choose library which feet best and then integrate that. After that a design the database and api endpoint.
 then test those api using postman. Also write some test code to test them. when the backend seems to ok to me, I start to work on client side. Starting fetching the api then binding it with the celender. After that test all the functionality and add some style to the client side.
  When all those finish I try to clone the project in my another pc. To check whether it run smoothly on my pc only or others too. Then confirming that I added the read me.

