import Poll from '../models/poll.js';

export const getPollById = async (id) => Poll.findById(id);
export const listPolls = async () => Poll.find().populate('user', 'email');
export const createPoll = async (data) => (await Poll.create(data)).populate('email');
export const updatePoll = async (id, data) => {
    console.log("Data param i services: " + JSON.stringify(data));

    Poll.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
}

export const removePoll = async (id) => {
    const poll = await Poll.findById(id);
    poll.remove;
};