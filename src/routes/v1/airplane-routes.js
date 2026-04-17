const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares')
const router = express.Router();

// /api/v1/airplanes POST 
router
    .post('/', 
        AirplaneMiddlewares.validateCreateRequest,
        AirplaneController.createAirplane
    );

// /api/v1/airplanes GET
router
    .get('/',
        AirplaneController.getAirplanes
    );

// /api/v1/airplanes/:id GET 
// For getting a particular airplane details.
router
    .get('/:id',
        AirplaneController.getAirplane
    )
    
// /api/v1/airplanes/:id DELETE 
// For deleting a particular airplane details.
router
    .delete('/:id',
        AirplaneController.destroyAirplane
    )

// /api/v1/airplanes/:id PATCH 
// For updating a particular airplane details.
router
    .patch('/:id',
        AirplaneMiddlewares.validateUpdateRequest,
        AirplaneController.updateAirplane
    )
module.exports = router;