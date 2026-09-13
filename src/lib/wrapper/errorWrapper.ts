import { APP_ERROR_WRAPPER, APP_UNEXPECTED_ERROR } from "../../constant/app";

export class nvErrorWrapper extends Error {
  constructor(
    public success: boolean,
    public status: number,
    public message: string,
    public data: string[],
    public error: string,
  ) {
    super(message ?? error ?? APP_UNEXPECTED_ERROR);
    this.name = APP_ERROR_WRAPPER;
  }
}
