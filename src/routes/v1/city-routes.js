const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares')
const router = express.Router();

// api/v1/cities POST
router
    .post('/',
        CityMiddlewares.validateCityRequest,
        CityController.createCity
    )

module.exports = router;