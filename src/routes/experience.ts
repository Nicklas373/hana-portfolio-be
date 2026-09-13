import { Router } from "express";
import { getExperience, getExperienceList } from "../lib/model/portfolio";
import { middleware } from "../middleware/middleware";
import { nvErrorWrapper } from "../lib/wrapper/errorWrapper";
import {
  APP_INVALID_COMPANY,
  APP_VALIDATION_BUSINESS,
  APP_VALIDATION_MISSING,
  APP_VAR_COMPANY_TOO_LONG,
} from "../constant/app";
import { charWithDigitSchema } from "../lib/zod/schema";

const router = Router();

router.get("/", middleware, async (req, res, next) => {
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
    next(error);
  }
});

router.get("/list", middleware, async (req, res, next) => {
  const company = req.query.company;

  if (!company) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_VALIDATION_MISSING,
      ),
    );
  }

  if (typeof company !== "string") {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_INVALID_COMPANY,
      ),
    );
  }

  if (charWithDigitSchema(50).safeParse(company).success === false) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_VAR_COMPANY_TOO_LONG,
      ),
    );
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
    next(error);
  }
});

export default router;
