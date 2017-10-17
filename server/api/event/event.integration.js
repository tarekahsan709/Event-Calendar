'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newEvent;

describe('Event API:', function () {

    describe('GET /api/events', function () {
        var events;

        beforeEach(function (done) {
            request(app)
                .get('/api/events')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    events = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            expect(events).to.be.instanceOf(Array);
        });
    });

    describe('POST /api/events', function () {
        beforeEach(function (done) {
            request(app)
                .post('/api/events')
                .send({
                    title: 'New Event',
                    startsAt: new Date().setHours(0, 0, 0, 0),
                    endsAt: new Date().setHours(0, 0, 0, 0)
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newEvent = res.body;
                    done();
                });
        });

        it('should respond with the newly created event', function () {
            expect(newEvent.title).to.equal('New Event');
            expect(new Date(newEvent.startsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
            expect(new Date(newEvent.endsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
        });
    });

    describe('GET /api/events/:id', function () {
        var event;

        beforeEach(function (done) {
            request(app)
                .get(`/api/events/${newEvent._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    event = res.body;
                    done();
                });
        });

        afterEach(function () {
            event = {};
        });

        it('should respond with the requested event', function () {
            expect(event.title).to.equal('New Event');
            expect(new Date(newEvent.startsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
            expect(new Date(newEvent.endsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
        });
    });

    describe('PUT /api/events/:id', function () {
        var updatedEvent;

        beforeEach(function (done) {
            request(app)
                .put(`/api/events/${newEvent._id}`)
                .send({
                    title: 'Updated Event',
                    startsAt: new Date().setHours(0, 0, 0, 0),
                    endsAt: new Date().setHours(0, 0, 0, 0)
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedEvent = res.body;
                    done();
                });
        });

        afterEach(function () {
            updatedEvent = {};
        });

        it('should respond with the updated event', function () {
            expect(updatedEvent.title).to.equal('Updated Event');
            expect(new Date(newEvent.startsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
            expect(new Date(newEvent.endsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
        });

        it('should respond with the updated event on a subsequent GET', function (done) {
            request(app)
                .get(`/api/events/${newEvent._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let event = res.body;

                    expect(event.title).to.equal('Updated Event');
                    expect(new Date(newEvent.startsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
                    expect(new Date(newEvent.endsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));

                    done();
                });
        });
    });

    describe('PATCH /api/events/:id', function () {
        var patchedEvent;

        beforeEach(function (done) {
            request(app)
                .patch(`/api/events/${newEvent._id}`)
                .send([
                    {op: 'replace', path: '/title', value: 'Patched Event'},
                    {op: 'replace', path: '/startsAt', value: new Date().setHours(0, 0, 0, 0)},
                    {op: 'replace', path: '/endsAt', value: new Date().setHours(0, 0, 0, 0)}
                ])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    patchedEvent = res.body;
                    done();
                });
        });

        afterEach(function () {
            patchedEvent = {};
        });

        it('should respond with the patched event', function () {
            expect(patchedEvent.title).to.equal('Patched Event');
            expect(new Date(newEvent.startsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
            expect(new Date(newEvent.endsAt).setHours(0, 0, 0, 0)).to.equal(new Date().setHours(0, 0, 0, 0));
        });
    });

    describe('DELETE /api/events/:id', function () {
        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete(`/api/events/${newEvent._id}`)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when event does not exist', function (done) {
            request(app)
                .delete(`/api/events/${newEvent._id}`)
                .expect(404)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });
});
