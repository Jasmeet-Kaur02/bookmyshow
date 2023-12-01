const router = require("express").Router();

const {
  getShowsByTheatreAndDate,
  get,
} = require("../controllers/ShowController");
const {
  getSeatsByTheatreAndShow,
} = require("../controllers/TheatreController");

router.get("/:theatreId/shows/:date", getShowsByTheatreAndDate);

router.get("/:theatreId/shows/:showId/:date/:time", getSeatsByTheatreAndShow);

module.exports = router;
