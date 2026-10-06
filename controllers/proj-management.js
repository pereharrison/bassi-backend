import Overview from "../model/overview-model.js"

export const createOverview = async (req, res) => {
  try {
    const { name, startDate, endDate, priority, tag, status } = req.body;
    if (!name || !startDate || !endDate || !priority || !tag || !status) {
      return res.status(400).json({
        success: false,
        message: "All fieldsa are required!",
      });
    }

    const overviewCreation = await Overview.create({
      name,
      startDate,
      endDate,
      priority,
      tag,
      status,
    });
    if (!overviewCreation) {
      return res.status(400).json({
        success: false,
        message: "Failed to create overview",
      });
    }
    res.status(201).json({
      succes: true,
      message: "Overview created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      sucsess: false,
      message: "Error occured from server",
    });
  }
};

export const getAllOverview = async (req, res) => {
  try {
    const allOverviews = await Overview.find({});
    if (!allOverviews) {
      return res.status(400).json({
        success: false,
        message: "Failed to get overviews",
      });
    }

    if (allOverviews <= 0) {
      return res.status(404).json({
        success: true,
        message: "U aint got no data bruh",
      });
    }

    res.status(200).json({
      success: true,
      data: allOverviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      sucsess: false,
      message: "Error occured from server",
    });
  }
};


export const projectStats = async (req, res) => {
  try {
    const total = await Overview.countDocuments();

    const onProgress = await Overview.countDocuments({
      status: "On progress",
    });

    const completed = await Overview.countDocuments({
      status: "Completed",
    });

    const overdue = await Overview.countDocuments({
      status: "Overdue",
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        onProgress,
        completed,
        overdue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



