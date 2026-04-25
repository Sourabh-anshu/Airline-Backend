const express = require('express');

const { AirportMiddlewares } = require('../../middlewares');
const { AirportController } = require('../../controllers');
const router = express.Router();

// POST: /api/v1/airports
router
    .post('/',
        AirportMiddlewares.validateCreateRequest,
        AirportController.CreateAirport
    )

// GET: api/v1/airports
router
    .get('/',
        AirportController.getAirports
    )

// GET: api/v1/airports/:id
router
    .get('/:id',
        AirportController.getAirport
    )

// DELETE: api/v1/airports/:id
router
    .delete('/:id',
        AirportController.destroyAirport
    )

// PATCH: api/v1/airports/:id
router
    .patch('/:id',
        AirportMiddlewares.validateUpdateRequest,
        AirportController.updateAirport
    )

module.exports = router;