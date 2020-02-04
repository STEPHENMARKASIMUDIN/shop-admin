import {
  requestOptions,
  optionsWithAuth,
  getToken
} from "./../../helpers/function";
import { RequestCallback, post, Options } from "request";
import { EnableSellerBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
import { MLShopAdminResponse } from "../../helpers/responses";
function EnableSeller(req: Request, res: Response) {
  const { merchantID, email }: EnableSellerBody = req.body;

  if (!merchantID || !email) {
    mlShopAdminLogger(
      "error",
      "Required parameter is Missing",
      "[enableSellerController.js]"
    );
    res.json(responseJson(400, ResMsg(8))).end();
  } else {
    const enableSellerRequestCallback: RequestCallback = (
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
          "[enableSellerController.js err]"
        );
        return res.json(responseJson(500, msg)).end();
      } else {
        return res.json(responseJson(b.ResponseCode, b.ResponseMessage));
      }
    };
    const options: Options = optionsWithAuth(
      requestOptions("enableSeller", { body: { merchantID, email } }),
      getToken(req).token
    );

    post(options, enableSellerRequestCallback);
  }
}

export default EnableSeller;
