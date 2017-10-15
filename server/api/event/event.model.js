'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  start_at: Date,
  end_at: Date
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
