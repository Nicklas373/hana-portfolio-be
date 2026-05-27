#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE hana_portfolio;
    CREATE USER kaori WITH PASSWORD 'MySecurePassword';
    GRANT CONNECT ON DATABASE hana_portfolio TO kaori;
EOSQL

pg_restore --clean --if-exists -U postgres -d hana_portfolio /backup/hana-portfolio-20260523-prod.backup

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "hana_portfolio" <<-EOSQL
    GRANT USAGE ON SCHEMA public TO kaori;
    GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO kaori;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO kaori;
EOSQL