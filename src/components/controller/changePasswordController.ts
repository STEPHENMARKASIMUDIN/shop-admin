import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { MLShopAdminResponse } from "./../../helpers/responses";
import { RequestCallback, Options, post } from "request";
import { ChangePasswordBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import * as passGen from "generate-password";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
function ChangePassword(req: Request, res: Response) {
  const { email, merchantID }: ChangePasswordBody = req.body;

  const generatedPassword = passGen.generate({
    excludeSimilarCharacters: true,
    exclude: "'(){}[]/\\|",
    length: 15,
    strict: true,
    numbers: true,
    symbols: true,
    uppercase: true
  });

  if (!email || !merchantID) {
    mlShopAdminLogger(
      "error",
      "Request Parameter is Missing",
      "[changePasswordController.js] err"
    );
    res.json(responseJson(401, ResMsg(8))).end();
  } else {
    const changePasswordRequestCallback: RequestCallback = (
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
          "[changePasswordController.js requestCB err]"
        );
        res.json(responseJson(500, msg)).end();
      } else {
        res.json(responseJson(b.ResponseCode, b.ResponseMessage));
      }
    };

    const options: Options = optionsWithAuth(
      requestOptions("changePassword", {
        body: { newPassword: generatedPassword, email, merchantID }
      }),
      getToken(req).token
    );

    post(options, changePasswordRequestCallback);
  }
}

export default ChangePassword;
