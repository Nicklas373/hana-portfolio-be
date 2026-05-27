import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contact } from "../src/constant/contact";
import { experience, experienceList } from "../src/constant/experience";
import { projects } from "../src/constant/projects";
import {
  contactMap,
  experienceListMap,
  experienceMap,
  projectMap,
} from "../src/types/interface";
import {
  getContact,
  getExperience,
  getExperienceList,
  getProject,
  insertContact,
} from "../src/lib/model/portfolio";
import { portfolioPool } from "../src/lib/pool";

vi.mock("../src/lib/pool", () => ({
  portfolioPool: {
    query: vi.fn(),
  },
}));

const mockContactData: contactMap[] = contact;
const mockExperienceData: experienceMap[] = experience;
const mockExperienceListData: experienceListMap[] = experienceList;
const mockProjectData: projectMap[] = projects;

describe("getContact", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock contact data", async () => {
    vi.mocked(portfolioPool.query).mockResolvedValue({
      rows: mockContactData,
    } as any);

    const result = await getContact();
    expect(result).toEqual(mockContactData);
    expect(result[0]).toMatchObject({
      fullname: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    });
    expect(result).toHaveLength(1);
    expect(portfolioPool.query).toHaveBeenCalled();
  });

  it("Mock contact error data", async () => {
    vi.mocked(portfolioPool.query).mockRejectedValue(
      new Error("failed to fetch contact"),
    );
    await expect(getContact()).rejects.toThrow("failed to fetch contact");
  });
});

describe("getExperience", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock experience data", async () => {
    vi.mocked(portfolioPool.query).mockResolvedValue({
      rows: mockExperienceData,
    } as any);

    const result = await getExperience();
    expect(result).toEqual(mockExperienceData);
    expect(result[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      description: expect.any(String),
      subdescription: expect.any(String),
      skills: expect.any(Array),
    });
    expect(result).toHaveLength(1);
    expect(portfolioPool.query).toHaveBeenCalled();
  });

  it("Mock experience error data", async () => {
    vi.mocked(portfolioPool.query).mockRejectedValue(
      new Error("failed to fetch experience"),
    );
    await expect(getExperience()).rejects.toThrow("failed to fetch experience");
  });
});

describe("getExperienceList", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock experience list data", async () => {
    vi.mocked(portfolioPool.query).mockResolvedValue({
      rows: mockExperienceListData,
    } as any);

    const result = await getExperienceList("myCompanyName");
    expect(result).toEqual(mockExperienceListData);
    expect(result[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      joblist: expect.any(Array),
    });
    expect(result).toHaveLength(1);
    expect(portfolioPool.query).toHaveBeenCalled();
  });

  it("Mock experience list error data", async () => {
    vi.mocked(portfolioPool.query).mockRejectedValue(
      new Error("failed to fetch experience list"),
    );
    await expect(getExperienceList("myCompanyName")).rejects.toThrow(
      "failed to fetch experience list",
    );
  });
});

describe("getProjects", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Mock projects data", async () => {
    vi.mocked(portfolioPool.query).mockResolvedValue({
      rows: mockProjectData,
    } as any);

    const result = await getProject();
    expect(result).toEqual(mockProjectData);
    expect(result[0]).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      techstack: expect.any(Array),
      source: expect.any(String),
      icons: expect.any(String),
    });
    expect(result).toHaveLength(1);
    expect(portfolioPool.query).toHaveBeenCalled();
  });

  it("Mock projects error data", async () => {
    vi.mocked(portfolioPool.query).mockRejectedValue(
      new Error("failed to fetch project"),
    );
    await expect(getProject()).rejects.toThrow("failed to fetch project");
  });
});

describe("insertContact", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockContactInsertPayload = {
    messageid: "1",
  };
  const mockContactResponsePayload = ["myName", "myEmail", "myMessage"];

  it("Mock insert contact data", async () => {
    vi.mocked(portfolioPool.query).mockResolvedValue({
      rows: [mockContactInsertPayload],
    } as any);

    const result = await insertContact(
      mockContactResponsePayload[0],
      mockContactResponsePayload[1],
      mockContactResponsePayload[2],
    );
    expect(result).toEqual(mockContactInsertPayload);
    expect(portfolioPool.query).toHaveBeenCalledTimes(1);
    expect(portfolioPool.query).toHaveBeenCalledWith(
      expect.any(String),
      mockContactResponsePayload,
    );
  });

  it("Mock insert contact error data", async () => {
    vi.mocked(portfolioPool.query).mockRejectedValue(
      new Error("failed to insert contact"),
    );
    await expect(
      insertContact(
        mockContactResponsePayload[0],
        mockContactResponsePayload[1],
        mockContactResponsePayload[2],
      ),
    ).rejects.toThrow("failed to insert contact");
  });
});
