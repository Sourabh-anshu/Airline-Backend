const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = new AppError(['explanation: Model number not found in the incoming request in the correct format' ], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if(!req.body) {
        ErrorResponse.message = `Something went wrong while updating the airplane`;
        ErrorResponse.error = new AppError(['explanation: No data is provided to update like modelNumber or capacity'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports ={
     validateCreateRequest,
     validateUpdateRequest
}