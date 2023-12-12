const {
  City,
  Theatre,
  ShowBooking,
  TheatreShowTiming,
  TheatreShow,
  Seat,
  sequelize,
} = require("../models");

const getCities = async (req, res) => {
  await City.findAll()
    .then((cityRes) => {
      return res.status(200).json({
        status: true,
        message: "",
        data: cityRes,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: `Internal Server Error ${err}`,
        data: null,
      });
    });
};

const getTheatresByCity = async (req, res) => {
  const cityId = parseInt(req.params.cityId);

  await Theatre.findAll({
    where: { cityId: cityId },
  })
    .then((theatres) => {
      return res.status(200).json({
        status: true,
        message: "All theatres of selected city have been fetched successfully",
        data: theatres,
      });
    })
    .catch(() => {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        data: null,
      });
    });
};

const getSeatsByTheatreAndShow = async (req, res) => {
  const theatreId = parseInt(req.params.theatreId);
  const showId = parseInt(req.params.showId);
  const date = req.params.date;
  const time = req.params.time;

  await TheatreShow.findAll({
    where: { theatreId, showId, date: new Date(date) },
    attributes: ["screenId"],
  })
    .then(async (theatreShow) => {
      await Seat.findAll({
        where: { screenId: theatreShow[0].dataValues.screenId },
        attributes: [
          "number",
          "id",
          [
            sequelize.fn(
              "IF",
              sequelize.where(
                sequelize.col("ShowBookings->bookedSeats.seatId"),
                "IS NOT", // Or 'IS NULL' based on the condition you need
                null
              ),
              "TRUE",
              "FALSE"
            ),
            "isBooked",
          ],
        ],
        include: [
          {
            model: ShowBooking,
            required: false,
            attributes: {
              exclude: [
                "userId",
                "theatreShowTimingId",
                "id",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: TheatreShowTiming,
                where: { time: time },
                attributes: { exclude: ["theatreShowId", "id", "time"] },
                include: [
                  {
                    model: TheatreShow,
                    attributes: {
                      exclude: [
                        "theatreId",
                        "showId",
                        "id",
                        "screenId",
                        "date",
                      ],
                    },
                    where: {
                      theatreId: theatreId,
                      showId: showId,
                      date: new Date(date),
                    },
                  },
                ],
              },
            ],
          },
        ],
      })
        .then((seats) => {
          return res.status(200).json({
            status: true,
            message:
              "All seats for selected show and theatre have been fetched successfully",
            data: seats,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: "internal Server Error",
        data: null,
      });
    });
};

module.exports = {
  getCities,
  getTheatresByCity,
  getSeatsByTheatreAndShow,
};
