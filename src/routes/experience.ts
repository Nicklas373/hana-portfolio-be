import { Router } from "express";
import { getExperience } from "../lib/model/portfolio";
import { middleware } from "../middleware/middleware";
import { errorFormatter } from "../lib/helper";

const router = Router();

router.get("/", middleware, async (req, res) => {
  try {
    const experienceData = await getExperience();

    return res.status(200).json({
      success: true,
      message: "OK",
      data: {
        experience: experienceData,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {
        experience: null,
      },
      error: errorFormatter(error),
    });
  }
});

export default router;
