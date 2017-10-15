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
                    title: 'Development Tools',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Server and Client integration',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Smart Build System',
                    startsAt: new Date(),
                    endsAt: new Date()

                }, {
                    title: 'Modular Structure',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Optimized Build',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Deployment Ready',
                    startsAt: new Date(),
                    endsAt: new Date()
                });
            })
            .then(() => console.log('finished populating events'))
            .catch(err => console.log('error populating events', err));

    }
}

