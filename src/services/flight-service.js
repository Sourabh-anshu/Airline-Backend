const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function CreateFlight(data){
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Cannnot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    CreateFlight,
}