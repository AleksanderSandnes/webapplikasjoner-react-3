import { pollService } from '../services/index.js';
import catchAsyncErrors from '..middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import Poll from '../models/poll.js';

export const get = async (req, res, next) => {
    const poll = await pollService.getPollById(req.params.id);
    if(!poll) {
        return res.status(404).json({ error: 'Not found'});
    }
    res.status(200).json(poll);
};

export const list = async (req, res, next) => {
    const result = await pollService.listPolls();
    console.log('Test fra /controller/poll.js/list - funker ved localhost:5000/polls');
    res.status(200).json(result);
};

export const create = async (req, res, next) => {
    try {
        const poll = await pollService.createPoll(req.body);
        res.status(201).json(poll);
    } catch (error) {
        res.status(400).json({ error: 'Create error'});
    }
};

export const update = catchAsyncErrors(async (req, res, next) => {
    let poll = await pollService.getPollById(req.params.id);

    console.log("REQ.PARAMS.ID: " + req.body._id);
    console.log("REQ.BODY " + JSON.stringify(req.body));
    console.log("REQ.BODY.VOTES " + req.body.votes);

    if(!poll) {
        return next (
            new ErrorHandler('Finner ikke poll med ${req.params.id} ved update i controller/poll.js', 404)
        );
    };

    poll = await pollService.updatePoll(req.params.id, req.body);
    res.status(200).json(poll);
});

export const remove = catchAsyncErrors(async (req, res, next) => {
    let poll = await pollService.getPollById(req.params.id);
    if (!poll) {
        return next (
            new ErrorHandler('Finner ikke poll med ${req.params.id} i remove i controller/poll.js', 404)
        );
    };

    poll = await pollService.removePoll(req.params.id);
    res.status(204).json({});
});