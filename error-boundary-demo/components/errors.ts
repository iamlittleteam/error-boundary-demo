export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class UIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UIError";
  }
}
