const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError(['explanation : name is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    else if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError(['explanation : code is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    else if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError(['explanation : cityId is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong while creating the airport';
        ErrorResponse.error = new AppError(['explanation : No data is provided in the incoming request', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}