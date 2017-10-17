# Event Scheduler


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

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `test:server:coverage` will show test coverage

Running `test:server` will run the server side test code.
