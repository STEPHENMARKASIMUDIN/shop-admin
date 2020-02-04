import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { MLShopAdminResponse } from "./../../helpers/responses";
import { RequestCallback, Options, post } from "request";
import { DisableSellerBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import ResMsg from "../../helpers/responseMsg";
import responseJson from "../../helpers/resJSON";
function DisableSeller(req: Request, res: Response) {
  const { merchantID, email }: DisableSellerBody = req.body;

  if (!merchantID || !email) {
    mlShopAdminLogger(
      "error",
      "Required Parameter is Missing",
      "[disableSellerController.js err]"
    );
    res.json(responseJson(401, ResMsg(8))).end();
  } else {
    const disableSellerRequestCallback: RequestCallback = (
      e: Error,
      r,
      b: MLShopAdminResponse
    ) => {
      if (e) {
        let msg = ResMsg(0);
        if (e.message == "socket hang up") {
          msg = ResMsg(7);
        }
        mlShopAdminLogger(
          "error",
          e.message,
          "[disableSellerController.js requestCB err]"
        );
        res.json(responseJson(500, msg)).end();
      } else {
        return res.json(responseJson(b.ResponseCode, b.ResponseMessage));
      }
    };

    const options: Options = optionsWithAuth(
      requestOptions("disableSeller", { body: { merchantID, email } }),
      getToken(req).token
    );
    post(options, disableSellerRequestCallback);
  }
}

export default DisableSeller;
