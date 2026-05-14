const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helper');
const { Op } = require('sequelize');

const flightRepository = new FlightRepository();

async function CreateFlight(data){
    try {
        // departure and arrival time validation
        if(!compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError("Arrival Time must be greater than departure time", StatusCodes.BAD_REQUEST);
        }

        // departure airport and arrival airport cannot be same
        if(data.arrivalAirportId == data.departureAirportId){
            throw new AppError("Arrival and departure airport cannot be same", StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        else if(error.name == 'SequelizeDatabaseError' || error.name == 'SequelizeForeignKeyConstraintError' || error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Cannnot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let endingTripTime = "T11:59:59Z";
    let customSort = [];

    // trips=MUM-DEL
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(departureAirportId == arrivalAirportId){
            throw new AppError("Arrival and departure airport cannot be same", StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    // price=2000-5000
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between] : [
                Number(minPrice), maxPrice ? Number(maxPrice) : 20000]
        }
    }

    //travellers=5
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }

    // tripDate=2024-01-15
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between] : [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    // sort=departureTime_ASC,price_DESC
    if(query.sort){
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split("_"));
        customSort = sortFilters;
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter,customSort);
        if(!flights || flights.length === 0) {
            throw new AppError("No flights found for the requested route", StatusCodes.NOT_FOUND);
        }
        return flights;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError("cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    CreateFlight,
    getAllFlights,  
}