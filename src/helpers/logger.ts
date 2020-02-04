import { LogLevel } from "./types";
import { join } from "path";
import { createLogger, transports, loggers } from "winston";

const date = new Date()
  .toJSON()
  .substring(0, 10)
  .trim();

const logger = (wantUILogger = false) => {
  const filename = join(
    `${wantUILogger ? process.env.PRODLOGS : process.env.DEVLOGS}`,
    `MLShopAdminLogs${date}.log`
  );

  return createLogger({
    transports: [
      new transports.File({
        level: "info",
        maxFiles: 3,
        maxsize: 5242880,
        filename
      })
    ]
  });
};

const mlShopAdminLogger = (
  level: LogLevel,
  message: string,
  messageOccured: string,
  wantUILogger = false
): void => {
  logger().log({
    timestamp: new Date().toJSON(),
    level,
    message,
    messageOccured
  });
};

export default mlShopAdminLogger;
