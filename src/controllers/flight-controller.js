const {StatusCodes} = require('http-status-codes');
const { FlightService } = require('../services');
const { response } = require('express');
const { error } = require('winston');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * POST : /flights
 * req-body : { flightNumber : 'AI101', airplaneId : 1, departureAirportId : 1, arrivalAirportId : 2, departureTime : '2024-01-15T10:00:00Z', arrivalTime : '2024-01-15T12:30:00Z', price : 5000, boardingGate : 'A1', totalSeats : 180 }
 */
async function CreateFlight(req,res) {
    try {
        const flight = await FlightService.CreateFlight({
            flightNumber : req.body.flightNumber,
            airplaneId : req.body.airplaneId,
            departureAirportId : req.body.departureAirportId,
            arrivalAirportId : req.body.arrivalAirportId,
            arrivalTime : req.body.arrivalTime,
            departureTime : req.body.departureTime,
            price : req.body.price,
            boardingGate : req.body.boardingGate,
            totalSeats : req.body.totalSeats
        });
        SuccessResponse.data = flight;
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
    CreateFlight,
}