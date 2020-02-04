import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { SellerDetailResponse } from "./../../helpers/responses";
import { RequestCallback, Options, post } from "request";
import { SellerDetailsBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
import e = require("compression");
function SellerDetail(req: Request, res: Response) {
  const { merchantID }: SellerDetailsBody = req.body;

  if (!merchantID) {
    mlShopAdminLogger(
      "error",
      "Required Parameter is Missing",
      "[sellerDetailController.js err]"
    );
    res.json(responseJson(400, ResMsg(8))).end();
  } else {
    const sellerDetailsRequestCallback: RequestCallback = (
      e: Error,
      r,
      { ResponseCode, ResponseMessage, result }: SellerDetailResponse
    ) => {
      if (e) {
        let msg = ResMsg(0);
        if (e.message == "socket hang up") {
          msg = ResMsg(7);
        }
        mlShopAdminLogger(
          "error",
          e.message,
          "[sellerDetailsController.js requestCB err]"
        );
        res.json(responseJson(500, msg)).end();
      } else {
        switch (ResponseCode) {
          case 200:
            res
              .json({
                ResponseCode: 200,
                ResponseMessage: ResMsg(200),
                result
              })
              .end();
            break;
          case 400:
            mlShopAdminLogger(
              "error",
              ResMsg(400),
              "[sellerDetailController.js requestCB err]"
            );
            res.json(responseJson(400, ResponseMessage)).end();
            break;
          case 401:
            mlShopAdminLogger(
              "error",
              ResMsg(401),
              "[sellerDetailController.js requestCB err]"
            );
            res.json(responseJson(401, ResponseMessage)).end();
            break;
          case 500:
            mlShopAdminLogger(
              "error",
              ResMsg(0),
              "[sellerDetailController.js requestCB err]"
            );
            res.json(responseJson(500, ResMsg(0))).end();
            break;
          default:
            mlShopAdminLogger(
              "error",
              ResMsg(7),
              "[sellerDetailController.js requestCB err]"
            );
            res.json(responseJson(500, ResMsg(7))).end();
            break;
        }
      }
    };

    const options: Options = optionsWithAuth(
      requestOptions("sellerDetails", { body: { merchantID } }),
      getToken(req).token
    );

    post(options, sellerDetailsRequestCallback);
  }
}

export default SellerDetail;
