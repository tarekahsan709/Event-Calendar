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
                    title: 'Metor',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Angular',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Node',
                    startsAt: new Date(),
                    endsAt: new Date()

                }, {
                    title: 'Gulp',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'TypeScript',
                    startsAt: new Date(),
                    endsAt: new Date()
                }, {
                    title: 'Babel',
                    startsAt: new Date(),
                    endsAt: new Date()
                });
            })
            .then(() => console.log('finished populating events'))
            .catch(err => console.log('error populating events', err));

    }
}

