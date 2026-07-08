/* eslint-disable @typescript-eslint/no-unused-vars */
export function getContactQB() {
  const query = `
        select fullname,
            email,
            message
        from contact
        where deleted = false;
    `;

  return query;
}

export function getExperienceQB() {
  const query = `
        select year,
            position,
            company,
            companyurl,
            description,
            subdescription,
            skills
        from experience
        where deleted = false;
    `;

  return query;
}

export function getExperienceListQB(company: string) {
  const query = `
        select year,
            position,
            company,
            joblist
        from experiencelist
        where company = $1
        and deleted = false;
    `;
  return query;
}

export function getProjectQB() {
  const query = `
        select name,
            description,
            techstack,
            source,
            icons
        from project
        where deleted = false;
    `;
  return query;
}

export function insertContactQB(
  fullname: string,
  email: string,
  message: string,
) {
  const query = `
    insert into contact (fullname, email, message)
    values ($1, $2, $3)
    returning messageid;`;
  return query;
}
