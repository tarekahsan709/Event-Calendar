'use strict';

import app from '../..';
import Event from './event.model';
var event;
var genEvent = function () {
    event = new Event({
        title: 'fake title',
        startsAt: new Date(),
        endsAt: new Date()
    });
    return event;
};

describe('Event Model', function () {
    before(function () {
        // Clear event before testing
        return Event.remove();
    });

    beforeEach(function () {
        genEvent();
    });

    afterEach(function () {
        return Event.remove();
    });

    it('should begin with no events', function () {
        return expect(Event.find({}).exec()).to
            .eventually.have.length(0);
    });

    //failing
    it('should fail when saving a duplicate event', function () {
        return expect(event.save()
            .then(function () {
                var eventDup = genEvent();
                return eventDup.save();
            })).to.be.rejected;
    });

    describe('#title', function () {
        it('should fail when saving with a blank title', function () {
            event.title = '';
            return expect(event.save()).to.be.rejected;
        });

        it('should fail when saving with a null title', function () {
            event.title = null;
            return expect(event.save()).to.be.rejected;
        });

        it('should fail when saving without an title', function () {
            event.title = undefined;
            return expect(event.save()).to.be.rejected;
        });
    });
    
});
