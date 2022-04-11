var eventModel = require("../../models/Event/event.model");

const createEvent = async (req, res) => {
    const { picture } = res.locals

    try {
        const data = {
            ...req.body,
            picture,
        };
        const newevent = await eventModel.create(data);

        res.send(newevent);
    } catch (error) {
        res.status(500).send({ message: error.message, stack: error.stack });
    }
};
const getEvents = async (req, res) => {
    try {
        const events = await eventModel.find();

        res.send(events);
    } catch (error) {
        res.status(500).send({ message: error.message, stack: error.stack });
    }
};
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await eventModel.findById(id);

        res.send(event);
    } catch (error) {
        res.status(500).send({ message: error.message, stack: error.stack });
    }
};
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventModel.findByIdAndDelete(id);

        res.send(event);
    } catch (error) {
        res.status(500).send({ message: error.message, stack: error.stack });
    }
};
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        //const { logo } = res.locals

        const event =
            await eventModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

        res.send(event);
    } catch (error) {
        res.status(500).send({ message: error.message, stack: error.stack });
    }
};

module.exports = { getEvents, createEvent, deleteEvent, updateEvent, getEventById };
