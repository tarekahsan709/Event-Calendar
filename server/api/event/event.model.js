'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        startsAt: {
            type: Date,
            required: true
        },
        endsAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    });

// EventSchema event is not duplicate

// EventSchema
//     .path('title')
//     .validate(function(value, respond) {
//         return this.constructor.findOne({ title: value }).exec()
//             .then(event => {
//                 if(event) {
//                     if(this.id === event.id && new Date(this.startsAt) == new Date(event.startsAt) && new Date(this.endsAt) == new Date(event.endsAt)) {
//                         return respond(true);
//                     }
//                     return respond(false);
//                 }
//                 return respond(true);
//             })
//             .catch(function(err) {
//                 throw err;
//             });
//     }, 'The specified event address is already in use.');


registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
