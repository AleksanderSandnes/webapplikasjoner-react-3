import { userService } from '../services/index.js';

import catchAsyncErrors from '../middleware/catchAsync.js';

export const create = catchAsyncErrors(async (req, res, next) => {
    console.log(req.email);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
});

export const listPolls = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const polls = await userService.listUserPolls(id);
    res.status(200).json(polls);
});