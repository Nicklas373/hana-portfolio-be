# HANA Portfolio [Backend Services]

A lightweight and secure REST API built with Express.js, TypeScript, and PostgreSQL for [HANA Portfolio](https://portfolio.hana-ci.com/dickyherlambang).

[![HANA Portfolio Backend Services [PROD]](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-prod.yml/badge.svg?branch=master)](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-prod.yml)
[![HANA Portfolio Backend Services [SIT]](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-sit.yml/badge.svg)](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-sit.yml)

---

## Features

- RESTful API architecture
- Contact form submission handling
- Experience & project data APIs
- Cloudflare Turnstile bot protection
- Rate limiting middleware
- Structured logging with Pino
- Request ID tracking
- CORS protection
- Dockerized deployment
- PostgreSQL integration

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Pino Logger
- Cloudflare Turnstile
- Docker
- CORS
- Express Rate Limit

---

## API Endpoints

### Contact

- `POST /api/v1/contact`
  - Submit contact form
  - Requires:
    - fullname
    - email
    - message
    - turnstileToken

---

### Experience

- `GET /api/v1/experience`
  - Return work experience data
- `GET /api/v1/experienceList?company=xxx`
  - Return work experience list data from specified company

---

### Projects

- `GET /api/v1/project`
  - Return list of projects

---

### Health Check

- `GET /api/v1/health`
  - Returns API status

---

## How to run (Docker)

### Clone repository

- Clone the repository:

```bash
git clone https://github.com/Nicklas373/hana-portfolio-be.git hana-portfolio-be
```

- Initiate docker compose (Make sure on root directory from this project):
  -- Applicable for frontend and backend

```bash
docker compose up -d
```

## Project Structure

```bash
src/
 ├── constant/
 ├── lib/
 ├── middleware/
 ├── routes/
 ├── types/
```

# HANA-CI Build Project 2016 - 2026
