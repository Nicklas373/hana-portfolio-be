import { Router } from "express";
import { getProject } from "../lib/model/portfolio";
import { middleware } from "../middleware/middleware";

const router = Router();

router.get("/", middleware, async (req, res, next) => {
  try {
    const projectData = await getProject();

    return res.status(200).json({
      success: true,
      message: "OK",
      data: {
        project: projectData,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
