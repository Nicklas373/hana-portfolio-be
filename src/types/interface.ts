export interface contactMap {
  fullname: string;
  email: string;
  message: string;
  turnstileToken: string;
}

export interface contactInsertMap {
  messageid: string;
}

export interface experienceMap {
  year: string;
  position: string;
  company: string;
  companyUrl: string;
  description: string;
  subdescription: string;
  skills: string[];
}

export interface experienceListMap {
  year: string;
  position: string;
  company: string;
  joblist: string[];
}

export interface projectMap {
  name: string;
  description: string;
  techstack: string[];
  link: string;
  source: string;
  icons: string;
}
