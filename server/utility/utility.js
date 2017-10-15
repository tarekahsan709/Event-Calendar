import jsonpatch from 'fast-json-patch';

function respondWithResult(res, status = 200) {
    return function (entity) {
        if (entity) {
            res.status(status).json(entity);
        }
        return null;
    }
}

function handleError(res, status = 404) {
    return function (err) {
        res.send(status).send(err);
    }
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.sendStatus(404).end();
            return null;
        }
        return entity;
    };
}

function removeEntity(res) {
    return function(entity) {
        if(entity) {
            return entity.destroy()
                .then(() => {
                    res.sendStatus(204).end();
                });
        }
    };
}

function patchUpdates(patches) {
    return function (entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

module.exports = {
    respondWithResult: respondWithResult,
    handleError: handleError,
    handleEntityNotFound: handleEntityNotFound,
    removeEntity: removeEntity,
    patchUpdates: patchUpdates
};