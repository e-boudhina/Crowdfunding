var uploaderMiddleware = require('../../middlewares/uploaderMiddleware');
const EventsController = require("../../controllers/Event/Event.controller");
const { authJwt } = require('../../middlewares');
const verifiedAccount_Middleware = require("../../middlewares/User/verifiedAccount_Middleware");
var upload = require('../../middlewares/defaultMulterConfig');

module.exports = function (router) {
  var API_ROUTE_HEADER = '/api/event';

  router
    .get(API_ROUTE_HEADER, EventsController.getEvents)

  router
    .post(API_ROUTE_HEADER,
      upload.single('picture'),
      uploaderMiddleware('picture', 'event'),
      EventsController.createEvent,
    );

  router
    .get(`${API_ROUTE_HEADER}/:id`,
      EventsController.getEventById)
  router.delete(
    `${API_ROUTE_HEADER}/:id`,
    // [authJwt.verifyToken, verifiedAccount_Middleware],
    EventsController.deleteEvent,
  )
  router.patch(
    `${API_ROUTE_HEADER}/:id`,
    // [authJwt.verifyToken, verifiedAccount_Middleware],
    upload.single('picture'),
    uploaderMiddleware('picture', 'event'),
    EventsController.updateEvent,
  );

}


