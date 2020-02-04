import {
  optionsWithAuth,
  requestOptions,
  getToken
} from "./../../helpers/function";
import { MLShopAdminResponse } from "./../../helpers/responses";
import { RequestCallback, Options, post } from "request";
import { EditSellerBody } from "./../../helpers/postRequest";
import { Request, Response } from "express";
import mlShopAdminLogger from "../../helpers/logger";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
function EditSeller(req: Request, res: Response) {
  const {
    merchantID,
    city,
    contactNumber,
    country,
    email,
    merchantName,
    shopName,
    storeAddress,
    storeDescription
  }: EditSellerBody = req.body;

  console.log(req.body);
  if (
    !merchantID ||
    !merchantName ||
    !city ||
    !contactNumber ||
    !country ||
    !email ||
    !shopName ||
    !storeAddress ||
    !storeDescription
  ) {
    mlShopAdminLogger(
      "error",
      "Required Parameter is Missing",
      "[editSellerController.js] err"
    );
    res.json(responseJson(401, ResMsg(8))).end();
  } else {
    const editSellerRequestCallback: RequestCallback = (
      e: Error,
      r,
      { ResponseCode, ResponseMessage }: MLShopAdminResponse
    ) => {
      let msg = ResMsg(0);
      if (e) {
        if (e.message == "socket hang up") {
          msg = ResMsg(7);
        }
        mlShopAdminLogger(
          "error",
          e.message,
          "[editSellerController.js] requestCB err"
        );
        res.json(responseJson(500, msg)).end();
      } else {
        console.log(ResponseCode);
        switch (ResponseCode) {
          case 200:
            res
              .json({
                ResponseCode: 200
              })
              .end();
            break;
          case 400:
            res.json(responseJson(400, ResponseMessage)).end();
            break;
          case 401:
            res.json(responseJson(401, ResponseMessage)).end();
            break;
          case 500:
            res.json(responseJson(500, ResMsg(0))).end();
            break;
          default:
            res.json(responseJson(500, ResMsg(7))).end();
            break;
        }
      }
    };

    const options: Options = optionsWithAuth(
      requestOptions("editSeller", {
        body: {
          merchantID,
          shopName,
          city,
          country,
          contactNumber,
          email,
          merchantName,
          storeAddress,
          storeDescription
        }
      }),
      getToken(req).token
    );
    post(options, editSellerRequestCallback);
  }
}

export default EditSeller;
