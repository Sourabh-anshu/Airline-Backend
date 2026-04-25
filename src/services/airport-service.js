const { AirportRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function CreateAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannnot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND)
            throw new AppError("Airport Not Found", error.statusCode);
            
        throw new AppError('Cannot fetch data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND)
            throw new AppError('Airport Not Found', error.statusCode);
        throw new AppError('Cannot delete the requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {

        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND)
            throw new AppError('Airport Not Found', error.statusCode);
        throw new AppError('Cannot update the requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    CreateAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}