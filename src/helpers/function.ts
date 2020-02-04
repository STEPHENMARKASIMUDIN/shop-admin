import { join } from "path";
import { AdminRoutes } from "./responses";
import { requestPayload } from "./types";
import { Options } from "request";
import * as express from "express";
import { statSync, mkdirSync, readdir } from "fs-extra";
import responseJson from "./resJSON";
import ResMsg from "./responseMsg";
import mlShopAdminLogger from "./logger";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";
import { urlencoded, json } from "body-parser";
import { createServer } from "http";
export interface T {}

export interface R {}
export const isNull = <T>(item?: T): boolean => {
  return typeof item === "object" && item === null;
};

export const trim = (str: string): string => {
  return str.trim();
};

export const pathStaticFiles = join(__dirname, "../build/static/media");

export const isFalsy = <T>(val: T): boolean => {
  let isValFalsy = false;
  switch (typeof val) {
    case "undefined":
      return (isValFalsy = true), isValFalsy;
    case "number":
      if (val === +0 || val === -0) {
        return (isValFalsy = true), isValFalsy;
      }

      if (val !== val) {
        return (isValFalsy = true), isValFalsy;
      }
      break;
    case "object":
      if (isNull(val)) {
        return (isValFalsy = true), isValFalsy;
      }
      break;
    case "string":
      return trim(val).length == 0
        ? ((isValFalsy = true), isValFalsy)
        : isValFalsy;
    case "boolean":
      return val === false ? ((isValFalsy = true), isValFalsy) : isValFalsy;
    default:
      break;
  }
};

export const getType = <T>(
  item: T
):
  | "boolean"
  | "string"
  | "number"
  | "object"
  | "bigint"
  | "symbol"
  | "undefined"
  | "function" => {
  return typeof item;
};

export const isNullOrUndefined = <T>(item: T): boolean => {
  return isNull(item) || isUndefined(item);
};

export const isUndefined = <T>(item?: T): boolean => {
  return typeof item === "undefined";
};

export const requestOptions = (
  path: string,
  o: requestPayload,
  isJson: boolean = true
): Options => ({
  url: `${process.env.URL}${path}`,
  json: isJson ? isJson : false,
  body: o.body ? o.body : null,
  qs: o.qs ? o.qs : null
});

export const makeDirSync = (path: string) => {
  try {
    const stateLogs = statSync(path);
    if (!stateLogs.isDirectory()) {
      mkdirSync(path, { recursive: true });
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      mkdirSync(path, { recursive: true });
    }
  }
};

export const pathToProdLogs = () => {
  if (process.env.NODE_ENV == "production") {
    return process.env.PRODLOGS;
  } else {
    return join(__dirname, process.env.PRODLOGS);
  }
};

export const pathforDevLogs = () => {
  if (process.env.NODE_ENV == "production") {
    return process.env.DEVLOGS;
  } else {
    return join(__dirname, process.env.DEVLOGS);
  }
};

export const optionsWithAuth = (opts: Options, token: string): Options => {
  return { ...opts, auth: { bearer: token } };
};

export const getToken = (
  req: express.Request
): { authType: "Bearer" | string; token: string } => {
  const authHeader = req.headers.authorization;
  const [b, token] = authHeader.split(" ");
  return { authType: b, token };
};

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  nxt: express.NextFunction
) => {
  try {
    const t = getToken(req);
    if (isNullOrUndefined(t.authType)) {
      return res.json(responseJson(401, ResMsg(401))).end();
    }
    if (t.authType !== "Bearer" || isNullOrUndefined(t.token)) {
      return res.json(responseJson(401, ResMsg(401))).end();
    } else {
      nxt();
    }
  } catch (err) {
    mlShopAdminLogger("error", err.message, `[verifyToken]`);
    return res.json(responseJson(401, ResMsg(401))).end();
  }
};

export const pathToUploadDir = (folderName?: string) =>
  join(
    __dirname,
    `../../${process.env.DEV_TEMP_PATH}${folderName ? `${folderName}/` : ""}`
  );

export let staticFiles: string[] = [];

export const makeUploadDir = (folderName?: string) => {
  try {
    const stat = statSync(pathToUploadDir(folderName ? folderName : null));
    if (!stat.isDirectory()) {
      mkdirSync(pathToUploadDir(folderName ? folderName : null), {
        recursive: true
      });
    }
  } catch (e) {
    if (e.code == "ENOENT") {
      mkdirSync(pathToUploadDir(folderName ? folderName : null), {
        recursive: true
      });
    }
  }
};

export class App {
  public app: express.Application;
  constructor(
    private routes: AdminRoutes[],
    public port: number | string,
    private authRoutes: string[]
  ) {
    this.port = port;
    this.routes = routes;
    this.authRoutes = authRoutes;
    this.app = express();
    this.app.set("env", process.env.NODE_ENV);
    this.makeDevLogsDir();
    this.makeProdLogsDir();
    makeUploadDir();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private makeProdLogsDir(): void {
    makeDirSync(pathToProdLogs());
  }

  private makeDevLogsDir(): void {
    makeDirSync(pathforDevLogs());
  }

  private initializeRoutes(): void {
    this.routes.forEach(routeAdmin => {
      if (this.authRoutes.includes(routeAdmin.path)) {
        this.app.use(routeAdmin.path, verifyToken, routeAdmin.router);
      } else {
        this.app.use(routeAdmin.path, routeAdmin.router);
      }
    });
    this.app.get("*", (req, res) => {
      res.sendFile(join(__dirname, "../build/index.html"));
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(json());
    this.app.use(cors());
    this.app.use(express.static(join(__dirname, "../build")));
    this.app.use(urlencoded({ extended: false }));
  }

  getStaticFiles = async () => {
    try {
      staticFiles = await readdir(pathStaticFiles);
    } catch (e) {
      mlShopAdminLogger("error", `${e.message}`, `[getStaticFiles() App]`);
      staticFiles;
    }
  };
  public listen() {
    return createServer(this.app).listen(this.port, () => {
      console.log(`Server listening at port: ${this.port}`);
    });
  }
}
