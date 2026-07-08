import dotenv from "dotenv";

dotenv.config();

import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/lib/model/portfolio", () => ({
  getContact: vi.fn(),
  getExperience: vi.fn(),
  getExperienceList: vi.fn(),
  getProject: vi.fn(),
  insertContact: vi.fn(),
}));

vi.mock("../src/middleware/rateLimiter", () => ({
  crudRateLimiter: (req: Request, res: Response, next: NextFunction) => next(),
  globalRequestRateLimiter: (req: Request, res: Response, next: NextFunction) =>
    next(),
}));

import request from "supertest";

import app from "../src/app";
import {
  contactMap,
  experienceListMap,
  experienceMap,
  projectMap,
} from "../src/types/interface";
import { projects } from "../src/constant/projects";
import {
  getContact,
  getExperience,
  getExperienceList,
  getProject,
  insertContact,
} from "../src/lib/model/portfolio";
import { contact } from "../src/constant/contact";
import { experience, experienceList } from "../src/constant/experience";
import { NextFunction } from "express";

const mockContactData: contactMap[] = contact;
const mockExperienceData: experienceMap[] = experience;
const mockExperienceListData: experienceListMap[] = experienceList;
const mockProjectData: projectMap[] = projects;

describe(`GET /api/v1/contact`, () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock API Get Contact Data", async () => {
    vi.mocked(getContact).mockResolvedValue(mockContactData);

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/contact`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.contact).toHaveLength(1);
    expect(response.body.data.contact[0]).toMatchObject({
      fullname: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
      turnstileToken: expect.any(String),
    });
  });

  it("Mock API error response", async () => {
    vi.mocked(getContact).mockRejectedValue(new Error("Internal server error"));

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/contact`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});

describe(`GET /api/v1/experience`, () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock API Get Experience Data", async () => {
    vi.mocked(getExperience).mockResolvedValue(mockExperienceData);

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/experience`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.experience).toHaveLength(1);
    expect(response.body.data.experience[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      description: expect.any(String),
      subdescription: expect.any(String),
      skills: expect.any(Array),
    });
  });

  it("Mock API error response", async () => {
    vi.mocked(getExperience).mockRejectedValue(
      new Error("Internal server error"),
    );

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/experience`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});

describe(`GET /api/v1/experience/list`, () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock API Get Experience List Data", async () => {
    vi.mocked(getExperienceList).mockResolvedValue(mockExperienceListData);

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/experience/list?company=myCompany`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.experienceList).toHaveLength(1);
    expect(response.body.data.experienceList[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      joblist: expect.any(Array),
    });
  });

  it("Mock API empty value parameters response", async () => {
    vi.mocked(getExperienceList).mockRejectedValue(
      new Error("Internal server error"),
    );

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/experience/list?company=`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Missing required parameters");
  });

  it("Mock API invalid type data parameters response", async () => {
    vi.mocked(getExperienceList).mockRejectedValue(
      new Error("Internal server error"),
    );

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/experience/list?company=a&company=b`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      "Invalid data type for specified parameters",
    );
  });

  it("Mock API error response", async () => {
    vi.mocked(getExperienceList).mockRejectedValue(
      new Error("Internal server error"),
    );

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/experience/list?company=myCompany`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});

describe(`GET /api/v1/project`, () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock API Get Project Data", async () => {
    vi.mocked(getProject).mockResolvedValue(mockProjectData);

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/project`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.project).toHaveLength(1);
    expect(response.body.data.project[0]).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      techstack: expect.any(Array),
      link: expect.any(String),
      source: expect.any(String),
      icons: expect.any(String),
    });
  });

  it("Mock API error response", async () => {
    vi.mocked(getProject).mockRejectedValue(new Error("Internal server error"));

    const response = await request(app)
      .get(`${process.env.BASE_URL}/api/v1/project`)
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});

describe(`POST /api/v1/contact`, () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockContactInsertPayload = {
    messageid: "1",
  };

  it("Mock API Post Contact Data", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
          }),
      } as Response),
    );

    vi.mocked(insertContact).mockResolvedValue([mockContactInsertPayload]);

    const response = await request(app)
      .post(`${process.env.BASE_URL}/api/v1/contact`)
      .send(mockContactData[0])
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.contact).toMatchObject([
      mockContactInsertPayload,
    ]);
  });

  it("Mock API error response", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
          }),
      } as Response),
    );

    vi.mocked(insertContact).mockRejectedValue(
      new Error("Internal server error"),
    );

    const response = await request(app)
      .post(`${process.env.BASE_URL}/api/v1/contact`)
      .send(mockContactData[0])
      .set("Authorization", `x-hana-key ${process.env.API_KEY}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
