import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { MLShopAdminResponse } from "./../../helpers/responses";
import { RequestCallback, Options, post } from "request";
import { SendMessageBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
function SendMessage(req: Request, res: Response) {
  const { sellerEmail, message }: SendMessageBody = req.body;

  if (!sellerEmail || !message) {
    mlShopAdminLogger(
      "error",
      "Required Parameter is Missing",
      "[sendMessageController.js err]"
    );
    res.json(responseJson(401, ResMsg(8))).end();
  } else {
    const sendMessageRequestCallback: RequestCallback = (
      e: Error,
      r,
      b: MLShopAdminResponse
    ) => {
      if (e) {
        let msg = ResMsg(0);
        if (e.message == "socket hang up") {
          msg = ResMsg(7);
          res.json(responseJson(500, msg)).end();
        }
      } else {
        res.json(responseJson(b.ResponseCode, b.ResponseMessage));
      }
    };

    const options: Options = optionsWithAuth(
      requestOptions("sendMessage", { body: { sellerEmail, message } }),
      getToken(req).token
    );

    post(options, sendMessageRequestCallback);
  }
}

export default SendMessage;
