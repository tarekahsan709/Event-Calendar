# Event Scheduler


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Run

1. Clone the project from - https://github.com/tarekahsan709/Event-Calendar

2. Run `npm install` to install server dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

5. Run `cd node_modules/iltorb && npm i && cd ../.. ` and then `gulp serve`in case you got
    #### Error: Cannot find module './build/bindings/iltorb.node'

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `test:server:coverage` will show test coverage

Running `test:server` will run the server side test code.
