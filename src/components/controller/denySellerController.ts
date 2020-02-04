import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { MLShopAdminResponse } from "./../../helpers/responses";
import { RequestCallback, Options, post } from "request";
import { DenySellerBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
function DenySeller(req: Request, res: Response) {
  const { merchantID, email }: DenySellerBody = req.body;

  if (!merchantID || !email) {
    mlShopAdminLogger(
      "error",
      "Required Parameter is Missing",
      "[denySellerController.js err]"
    );
    res.json(responseJson(400, ResMsg(8))).end();
  } else {
    const denySellerRequestCallback: RequestCallback = (
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
          "[denySellerController.js requestCB err]"
        );
        res.json(responseJson(500, msg)).end();
      } else {
        res.json(responseJson(b.ResponseCode, b.ResponseMessage));
      }
    };
    const options: Options = optionsWithAuth(
      requestOptions("denySeller", { body: { merchantID, email } }),
      getToken(req).token
    );

    post(options, denySellerRequestCallback);
  }
}

export default DenySeller;
