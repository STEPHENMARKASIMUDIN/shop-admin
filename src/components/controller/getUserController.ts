import { Options, RequestCallback, RequestResponse, post } from "request";
import { optionsWithAuth, getToken } from "./../../helpers/function";
import { Request, Response } from "express";
import { MLShopAdminResponse } from "../../helpers/responses";
import ResMsg from "../../helpers/responseMsg";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";

const GetLoginData = (req: Request, res: Response) => {
  const options: Options = optionsWithAuth(
    { url: `${process.env.URL}getLoginData`, json: true },
    getToken(req).token
  );

  const getLoginDataRequestCallback: RequestCallback = (
    e: Error,
    r: RequestResponse,
    b: MLShopAdminResponse
  ) => {
    if (e) {
      let message = ResMsg(0);
      if (e.message == "socekt hang up") {
        message = ResMsg(7);
      }
      mlShopAdminLogger("error", e.message, `[GetLoginData.js requestCB err]`);
      return res.json(responseJson(500, message)).end();
    } else {
      mlShopAdminLogger(
        "info",
        b.ResponseMessage,
        `[GetLoginData.js requestCB]`
      );
      return res.json(b).end();
    }
  };

  post(options, getLoginDataRequestCallback);
};

export default GetLoginData;
