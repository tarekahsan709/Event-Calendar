'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
    title: String,
    startsAt: Date,
    endsAt: Date
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
