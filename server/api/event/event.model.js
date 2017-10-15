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
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
