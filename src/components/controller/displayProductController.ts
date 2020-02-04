import { optionsWithAuth, getToken } from "./../../helpers/function";
import { Options, RequestCallback, get } from "request";
import { Request, Response } from "express";
import { DisplayProductResponse } from "../../helpers/responses";
import ResMsg from "../../helpers/responseMsg";
import responseJson from "../../helpers/resJSON";
import mlShopAdminLogger from "../../helpers/logger";
const DisplayProduct = (req: Request, res: Response) => {
  const options: Options = optionsWithAuth(
    { url: `${process.env.URL}displayProducts`, json: true },
    getToken(req).token
  );

  const displayProductRequestCallback: RequestCallback = (
    e: Error,
    r,
    { ResponseCode, ResponseMessage, Products_List }: DisplayProductResponse
  ) => {
    if (e) {
      let msg = ResMsg(0);
      if (e.message == "socket hang up") {
        msg = ResMsg(7);
      }
      mlShopAdminLogger(
        "error",
        e.message,
        "[displayProductController.js requestCB err]"
      );
      return res.json(responseJson(500, msg)).end();
    } else {
      switch (ResponseCode) {
        case 200:
          res
            .json({
              ResponseCode: 200,
              ResponseMessage: ResMsg(200),
              Products_List
            })
            .end();
          break;
        case 400:
          mlShopAdminLogger(
            "error",
            ResMsg(400),
            "[displayProductController.js requestCB err]"
          );
          res.json(responseJson(400, ResponseMessage)).end();
          break;
        case 401:
          mlShopAdminLogger(
            "error",
            ResMsg(401),
            "[displayProductController.js requestCB err]"
          );
          res.json(responseJson(401, ResponseMessage)).end();
          break;
        case 500:
          mlShopAdminLogger(
            "error",
            ResponseMessage,
            "[displayProductController.js requestCB err]"
          );
          res.json(responseJson(500, ResMsg(7))).end();
        default:
          mlShopAdminLogger(
            "error",
            ResMsg(7),
            "[displayProductController.js requestCB err]"
          );
          res.json(responseJson(500, ResMsg(7))).end();
          break;
      }
    }
  };
  get(options, displayProductRequestCallback);
};

export default DisplayProduct;
