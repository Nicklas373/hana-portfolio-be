import { config } from "../lib/config";

export const APP_NAME = config.app.name;
export const APP_ERROR_WRAPPER = "NVErrorWrapper";

export const APP_INVALID_AUTHORIZATION_NVAK = "Invalid nvAK";
export const APP_INVALID_AUTHORIZATION_NVAT = "Invalid nvAT";
export const APP_INVALID_AUTHORIZATION_NVMK = "Invalid nvMK";
export const APP_INVALID_COMPANY = "Invalid company";
export const APP_INVALID_FULLNAME = "Invalid name";
export const APP_INVALID_EMAIL = "Invalid email";
export const APP_INVALID_MESSAGE = "Invalid message";
export const APP_INVALID_HEADERS = "Invalid headers";
export const APP_INVALID_TOKEN = "Invalid token";

export const APP_REQUEST_ERROR = "Request error";
export const APP_REQUEST_NOT_FOUND = "Request not found";

export const APP_UNEXPECTED_ERROR = "Unexpected error";
export const APP_UNEXPECTED_HEADER = "Unexpected headers";

export const APP_VAR_COMPANY_TOO_LONG = "Company characters exceed limits";
export const APP_VAR_MESSAGE_TOO_LONG = "Message characters exceed limits";

export const APP_VALIDATION_AUTHORIZATION = "Authorization validation";
export const APP_VALIDATION_BUSINESS = "Business validation";
export const APP_VALIDATION_MISSING = "Missing required parameters";
