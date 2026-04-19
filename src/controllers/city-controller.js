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

/**
 * DELETE : /cities/:id
 * req-body : {} 
 */
async function deleteCity(req, res) {
    try {
        const deletedCity = await CityService.deleteCity(req.params.id);
        SuccessResponse.data = 'The city is successfully deleted';
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * PATCH : /cities/:id
 * req-body : { name : 'Kolkata'}
 */
async function updateCity(req, res) {
    try {
        let value = {};
        if(req.body.name) Object.assign(value, {name : req.body.name});
        const response = await CityService.updateCity(req.params.id, value);
        SuccessResponse.data = 'Successfully updated the city';
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
module.exports = {
    createCity,
    deleteCity,
    updateCity
}