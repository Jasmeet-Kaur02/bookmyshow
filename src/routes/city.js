const router = require("express").Router();

const { getTheatresByCity } = require("../controllers/TheatreController");

router.get("/:cityId/theatres", getTheatresByCity);

module.exports = router;
