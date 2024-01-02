const {
  Show,
  TheatreShow,
  TheatreShowTiming,
  ShowBooking,
  sequelize,
} = require("../models");

const getShowsByTheatreAndDate = async (req, res) => {
  const theatreId = parseInt(req.params.theatreId);
  const date = req.params.date;
  try {
    const shows = await Show.findAll({
      include: [
        {
          model: TheatreShow,
          as: "showDates",
          attributes: ["date"],
          where: {
            theatreId: theatreId,
            date: new Date(date),
          },
          include: [
            {
              model: TheatreShowTiming,
              attributes: ["time", "id"],
              as: "showTimings",
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: true,
      message: "All shows of selected theatre have been fetched successfully",
      data: shows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      data: null,
      message: err,
    });
  }
};

const createBooking = async (req, res) => {
  const data = req.body;

  try {
    await sequelize.transaction(async (t) => {
      try {
        const showBooking = await ShowBooking.create(
          {
            userId: data.userId,
            theatreShowTimingId: data.timingId,
            createdAt: new Date(),
            udpatedAt: new Date(),
          },
          { transaction: t }
        );

        await showBooking.addSeats(data.seats, { transaction: t });
        await t.commit();
        const seats = await showBooking.getSeats();

        return res.status(201).json({
          status: true,
          message: "Seats has been reserved",
          data: { showBooking, seats: seats },
        });
      } catch (err) {
        await t.rollback();
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          data: null,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  getShowsByTheatreAndDate,
  createBooking,
};
