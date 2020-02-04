export type LogLevel = "error" | "info" | "debug";

export type StringOrNumber = string | number;
export type ErrorOrNull = Error | null;
export type StringOrNull = string | null;

export type requestPayload = {
  body?: any;
  qs?: any;
};
