# HANA Portfolio [Backend Services]

A lightweight and secure REST API built with Express.js, TypeScript, and PostgreSQL for [HANA Portfolio](https://portfolio.hana-ci.com/dickyherlambang).

[![HANA Portfolio Backend Services [PROD]](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-prod.yml/badge.svg?branch=master)](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-prod.yml)
[![HANA Portfolio Backend Services [SIT]](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-sit.yml/badge.svg)](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/docker-sit.yml)
[![Snyk Security](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/snyk.yml/badge.svg?branch=master)](https://github.com/Nicklas373/hana-portfolio-be/actions/workflows/snyk.yml)

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

- Set credentials
  (On Linux)

```bash
  echo "mySecretApi" | sudo docker secret create hana_portfolio_api_key -
  echo "MySecurePassword" | sudo docker secret create hana_portfolio_db_password -
  echo "MySecurePassword" | sudo docker secret create hana_portfolio_redis_password -
  echo "1x0000000000000000000000000000000AA" | sudo docker secret create hana_portfolio_turnstile_secret -
```

(On Windows)

```bash
  # Initiate from powershell
  [System.IO.File]::WriteAllBytes("$env:TEMP\secretApi",[System.Text.Encoding]::UTF8.GetBytes("mySecretApi"))
  [System.IO.File]::WriteAllBytes("$env:TEMP\redis-password",[System.Text.Encoding]::UTF8.GetBytes("MySecurePassword"))
  [System.IO.File]::WriteAllBytes("$env:TEMP\db-password",[System.Text.Encoding]::UTF8.GetBytes("MySecurePassword"))
  [System.IO.File]::WriteAllBytes("$env:TEMP\turnstile-password",[System.Text.Encoding]::UTF8.GetBytes("1x0000000000000000000000000000000AA"))

  # Import secret to docker
  cmd /c "set /p =mySecretApi<nul" | docker secret create hana_portfolio_api_key -
  cmd /c "set /p =MySecurePassword<nul" | docker secret create hana_portfolio_db_password -
  cmd /c "set /p =MySecurePassword<nul" | docker secret create hana_portfolio_redis_password -
  cmd /c "set /p =1x0000000000000000000000000000000AA<nul" | docker secret create hana_portfolio_turnstile_secret -
```

With docker compose

```bash
  docker compose up -d
```

With docker swarm

```bash
  docker swarm init
  docker network create --driver=overlay --attachable hana-network
  docker stack deploy -c docker-swarm.yaml hana_portfolio
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
