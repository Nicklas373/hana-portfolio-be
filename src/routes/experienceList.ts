import { Router } from "express";
import { getExperienceList } from "../lib/model/portfolio";
import { middleware } from "../middleware/middleware";
import { errorFormatter } from "../lib/helper";

const router = Router();

router.get("/", middleware, async (req, res) => {
  const company = req.query.company;

  if (!company) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      data: {
        experienceList: null,
      },
      error: "Missing required parameters",
    });
  }

  if (typeof company !== "string") {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      data: {
        experienceList: null,
      },
      error: "Invalid data type for specified parameters",
    });
  }

  try {
    const experienceListData = await getExperienceList(company);

    return res.status(200).json({
      success: true,
      message: "OK",
      data: {
        experienceList: experienceListData,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {
        experienceList: null,
      },
      error: errorFormatter(error),
    });
  }
});

export default router;
