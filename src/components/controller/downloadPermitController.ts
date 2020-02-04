import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { MLShopAdminResponse } from "./../../helpers/responses";
import { RequestCallback, Options, get } from "request";
import { DownloadQry } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
function DownloadPermit(req: Request, res: Response) {
  const { shopName, permitType }: DownloadQry = req.query;

  if (!shopName || !permitType) {
    mlShopAdminLogger(
      "error",
      "Required Parameter is Missing",
      "[downloadPermitController.js] err"
    );
    res.json(responseJson(401, ResMsg(8))).end();
  } else {
    const downloadPermitRequestCallback: RequestCallback = (
      e: Error,
      r,
      result
    ) => {
      if (e) {
        let msg = ResMsg(0);
        if (e.message == "socket hang up") {
          msg = ResMsg(7);
        }
        mlShopAdminLogger(
          "error",
          e.message,
          "[downloadPermitController.js] requestCB err"
        );
        res.json(responseJson(500, msg)).end();
      } else {
        let ResponseCode = 200,
          ResponseMessage = "21321";
        console.log(result.type);
        switch (ResponseCode) {
          case 200:
            res.json({
              ResponseCode: 200,
              result
            });
            break;
          case 400:
            res.json(responseJson(ResponseCode, ResponseMessage)).end();
            break;
          case 401:
            res.json(responseJson(ResponseCode, ResponseMessage)).end();
            break;
          case 500:
            res.json(responseJson(ResponseCode, ResMsg(7))).end();
            break;
          default:
            res.json(responseJson(500, ResMsg(0))).end();
            break;
        }
      }
    };

    const options: Options = optionsWithAuth(
      requestOptions("downloadPermit", { qs: { shopName, permitType } }, false),
      getToken(req).token
    );

    get(options, downloadPermitRequestCallback);
  }
}

export default DownloadPermit;
