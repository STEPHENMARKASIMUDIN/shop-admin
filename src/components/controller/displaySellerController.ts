import { DisplaySellerResponse } from "./../../helpers/responses";
import { optionsWithAuth, getToken } from "./../../helpers/function";
import { Options, RequestCallback, RequestResponse, get } from "request";
import { Request, Response, response } from "express";
import ResMsg from "../../helpers/responseMsg";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";

const DisplaySeller = (req: Request, res: Response) => {
  const options: Options = optionsWithAuth(
    { url: `${process.env.URL}displaySellers`, json: true },
    getToken(req).token
  );

  const displaySellerRequestCallback: RequestCallback = (
    e: Error,
    r: RequestResponse,
    { ResponseCode, ResponseMessage, Seller_List }: DisplaySellerResponse
  ) => {
    if (e) {
      let msg = ResMsg(0);
      if (e.message == "socket hang up") {
        msg = ResMsg(7);
      }
      mlShopAdminLogger(
        "error",
        e.message,
        "[displaySellerController.js requestCB err]"
      );
      return res.json(responseJson(500, msg)).end();
    } else {
      switch (ResponseCode) {
        case 200:
          res
            .json({
              ResponseCode: 200,
              ResponseMessage: ResMsg(200),
              Seller_List
            })
            .end();
          break;
        case 401:
          res.json(responseJson(401, ResponseMessage)).end();
          break;
        case 400:
          res.json(responseJson(400, ResponseMessage)).end();
        case 500:
          res.json(responseJson(500, ResMsg(7)));
        default:
          res.json(responseJson(500, ResMsg(7))).end();
          break;
      }
    }
  };
  get(options, displaySellerRequestCallback);
};

export default DisplaySeller;
