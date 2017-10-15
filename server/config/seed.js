/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Event from '../api/event/event.model';

import config from './environment/';

export default function seedDatabaseIfNeeded() {
    if (config.seedDB) {
        Event.find({}).remove()
            .then(() => {
                Event.create({
                    name: 'Development Tools',
                    info: 'Integration with popular',
                    start_at: new Date(),
                    end_at: new Date()
                }, {
                    name: 'Server and Client integration',
                    info: 'Built with a powerful and fun stack:',
                    start_at: new Date(),
                    end_at: new Date()
                }, {
                    name: 'Smart Build System',
                    info: 'Build system ignores `spec` files, allowing you to keep ',
                    start_at: new Date(),
                    end_at: new Date()

                }, {
                    name: 'Modular Structure',
                    info: 'Best practice client and server structures allow for more ',
                    start_at: new Date(),
                    end_at: new Date()
                }, {
                    name: 'Optimized Build',
                    info: 'Build process packs up your templates as a single JavaScript ',
                    start_at: new Date(),
                    end_at: new Date()
                }, {
                    name: 'Deployment Ready',
                    info: 'Easily deploy your app to Heroku or Openshift with the heroku ',
                    start_at: new Date(),
                    end_at: new Date()
                });
            })
            .then(() => console.log('finished populating events'))
            .catch(err => console.log('error populating events', err));

    }
}

