const paginationPipeline = require("../../helpers/paginationPipeline");
var eventModel = require("../../models/Event/event.model");

const createEvent = async (req, res) => {
  const {picture} = res.locals;

  try {
    const data = {
      ...req.body,
      picture,
    };
    const newevent = await eventModel.create(data);

    res.send(newevent);
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};
const getEvents = async (req, res) => {
  const {page = "1", keyword = "", ...restOfQuery} = req.query;

  if (keyword !== "")
    restOfQuery.EventName = new RegExp(
      keyword.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") || "",
      "gi"
    );

  try {
    const events = await eventModel.aggregate(
      paginationPipeline({
        page,
        filter: restOfQuery,
        pageLimit: 10,
      })
    );
    console.log(events);
    res.send(events?.[0] || emptyPaginationPayload);
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};

const getEventById = async (req, res) => {
  try {
    const {id} = req.params;

    const event = await eventModel.findById(id);

    res.send(event);
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};
const deleteEvent = async (req, res) => {
  try {
    const {id} = req.params;
    const event = await eventModel.findByIdAndDelete(id);

    res.send(event);
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};
const updateEvent = async (req, res) => {
  try {
    const {id} = req.params;
    //const { logo } = res.locals

    const event = await eventModel.findByIdAndUpdate(
      id,
      {...req.body},
      {new: true}
    );

    res.send(event);
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};

module.exports = {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventById,
};
