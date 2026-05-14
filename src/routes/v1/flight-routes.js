const express = require('express');

const { FlightMiddlewares } = require('../../middlewares');
const { FlightController } = require('../../controllers');
const router = express.Router();

// POST: /api/v1/flights
router
    .post('/',
        FlightMiddlewares.validateCreateRequest,
        FlightController.CreateFlight
    );

// GET: /api/v1/flights?trips=MUM-DEL
router
    .get('/',
        FlightController.getAllFlights
    );

module.exports = router;