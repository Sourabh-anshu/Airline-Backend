const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function validateCityRequest(req, res, next) {
    if(!req.body){
        ErrorResponse.message = 'Something went wrong while creating the city';
        ErrorResponse.error = new AppError (['explanation : City-name is not provided in the coming request in the correct format'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCityRequest
}