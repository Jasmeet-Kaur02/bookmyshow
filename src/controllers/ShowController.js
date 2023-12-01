const { Show, TheatreShow, TheatreShowTiming } = require("../models");

const getShowsByTheatreAndDate = async (req, res) => {
  const theatreId = parseInt(req.params.theatreId);
  const date = req.params.date;
  try {
    const shows = await Show.findAll({
      include: [
        {
          model: TheatreShow,
          attributes: {
            include: ["date"],
            exclude: ["theatreId", "showId", "id"],
          },
          where: {
            theatreId: theatreId,
            date: new Date(date),
          },
          include: [
            {
              model: TheatreShowTiming,
              attributes: { exclude: ["theatreShowId", "id"] },
              as: "timings",
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

module.exports = {
  getShowsByTheatreAndDate,
};
