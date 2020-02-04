import { requestOptions } from "../../helpers/function";
import { LoginResponse } from "../../helpers/responses";
import { LoginBody } from "../../helpers/postRequest";
import { Request, Response } from "express";
import responseJson from "../../helpers/resJSON";
import ResMsg from "../../helpers/responseMsg";
import { RequestCallback, post } from "request";

function Login(req: Request, res: Response): void {
  const { username, password }: LoginBody = req.body;

  if (!username || !password) {
    res.json(responseJson(463, ResMsg(8))).end();
  } else {
    const loginRequestCallback: RequestCallback = (
      e: Error,
      r,
      { ResponseCode, ResponseMessage, loginData }: LoginResponse
    ) => {
      if (e) {
        let resmsg = ResMsg(0);
        if ((e.message = "socket hang up")) {
          resmsg = ResMsg(7);
        }

        return res.json(responseJson(500, resmsg)).end();
      }
      switch (ResponseCode) {
        case 401:
          res.json(responseJson(401, ResMsg(1))).end();
          break;
        case 400:
          res.json(responseJson(400, ResponseMessage)).end();
          break;
        case 200:
          res
            .json({
              ResponseCode: 200,
              ResponseMessage: ResMsg(200),
              loginData
            })
            .end();
          break;
        case 500:
          res.json(responseJson(500, ResMsg(7))).end();
        default:
          res.json(responseJson(500, ResMsg(7))).end();
          break;
      }
    };

    post(
      requestOptions("login", { body: { ...req.body } }),
      loginRequestCallback
    );
  }
}

export default Login;
