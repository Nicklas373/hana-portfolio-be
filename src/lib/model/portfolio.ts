import {
  contactInsertMap,
  contactMap,
  experienceListMap,
  experienceMap,
  projectMap,
} from "../../types/interface";
import { portfolioPool } from "../pool";
import {
  getContactQB,
  getExperienceListQB,
  getExperienceQB,
  getProjectQB,
  insertContactQB,
} from "../queryBuilder/portfolio";

export async function getContact(): Promise<contactMap[]> {
  const query = getContactQB();

  try {
    const { rows } = await portfolioPool.query(query);
    return rows as contactMap[];
  } catch (error) {
    console.error("failed to fetch contact: ", error);
    throw error;
  }
}

export async function getExperience(): Promise<experienceMap[]> {
  const query = getExperienceQB();

  try {
    const { rows } = await portfolioPool.query(query);
    return rows as experienceMap[];
  } catch (error) {
    console.error("failed to fetch experience: ", error);
    throw error;
  }
}

export async function getExperienceList(
  company: string,
): Promise<experienceListMap[]> {
  const query = getExperienceListQB(company);

  try {
    const { rows } = await portfolioPool.query(query, [company]);
    return rows as experienceListMap[];
  } catch (error) {
    console.error("failed to fetch experienceList:  ", error);
    throw error;
  }
}

export async function getProject(): Promise<projectMap[]> {
  const query = getProjectQB();

  try {
    const { rows } = await portfolioPool.query(query);
    return rows as projectMap[];
  } catch (error) {
    console.error("failed to fetch project: ", error);
    throw error;
  }
}

export async function insertContact(
  fullname: string,
  email: string,
  message: string,
): Promise<contactInsertMap[]> {
  const query = insertContactQB(fullname, email, message);

  try {
    const { rows } = await portfolioPool.query(query, [
      fullname,
      email,
      message,
    ]);
    return rows[0] as contactInsertMap[];
  } catch (error) {
    console.error("failed to insert contact: ", error);
    throw error;
  }
}
