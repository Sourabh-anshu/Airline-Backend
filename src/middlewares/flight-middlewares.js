const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : flightNumber is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : airplaneId is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : departureAirportId is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : arrivalAirportId is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : arrivalTime is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : departureTime is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : price is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(['explanation : totalSeats is not found in the incoming request in correct format', StatusCodes.BAD_REQUEST]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
}