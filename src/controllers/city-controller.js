const {StatusCodes} = require('http-status-codes');
const { CityService } = require('../services');
const { response } = require('express');
const { error } = require('winston');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * POST : /cities
 * req-body : { name : 'Kolkata' }
 */
async function createCity(req,res) {
    try {
        const response = await CityService.createCity({
            name : req.body.name
        })

        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createCity
}