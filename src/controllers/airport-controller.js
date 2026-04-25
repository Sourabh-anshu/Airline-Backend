const {StatusCodes} = require('http-status-codes');
const { AirportService } = require('../services');
const { response } = require('express');
const { error } = require('winston');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * POST : /airports
 * req-body : { name : 'Netaji Subhash Chandra Bose International Airport', code : 'CCU', address : Kolkata, West Bengal, cityId : id of city from the city table to make a foreign key constraint }
 */
async function CreateAirport(req, res) {
    try {
        const airport = await AirportService.CreateAirport({
            name : req.body.name,
            code : req.body.code,
            address : req.body.address,
            cityId : req.body.cityId
        });
        SuccessResponse.data = airport
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
 * GET: /airports
 * req-body: {}
 */
async function getAirports(req,res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
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
 * GET: airports/:id
 * req-body: {}
 */
async function getAirport(req,res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
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
 * DEL: airports/:id
 * req-body: {}
 */
async function destroyAirport(req,res) {
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
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
 * PATCH: airports/:id
 * req-body: {name: "XYZ"}
 */
async function updateAirport(req,res) {
    try {
        let data = {};
        if(req.body.name)   Object.assign(data, {name: req.body.name});
        if(req.body.code)   Object.assign(data, {code: req.body.code});
        if(req.body.cityId)   Object.assign(data, {cityId: req.body.cityId});
        if(req.body.address)   Object.assign(data, {address: req.body.address});
        const airport = await AirportService.updateAirport(req.params.id, data);
        SuccessResponse.data = airport;
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
    CreateAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}