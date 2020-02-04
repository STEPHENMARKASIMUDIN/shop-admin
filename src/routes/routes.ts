import { AdminRoutes } from "./../helpers/responses";
import loginRouter from "./loginRoute";
import getLoginData from "./getLoginDataRoute";
import displaySellers from "./displaySellerRoute";
import displayProduct from "./displayProductRoute";
import enableSeller from "./enableSellerRoute";
import disableSeller from "./disableSellerRoute";
import denySeller from "./denySellerRoute";
import sellerDetails from "./sellerDetailsRoute";
import sendMessage from "./sendMessageRoute";
import changePassword from "./changePasswordRoute";
import editSeller from "./editSellerRoute";
import downloadPermit from "./downloadPermitRoute";
const mainPath = "/mlshopadmin/route/";

export const adminRoutes: AdminRoutes[] = [
  { path: `${mainPath}login`, router: loginRouter },
  { path: `${mainPath}getLoginData`, router: getLoginData },
  { path: `${mainPath}displaySeller`, router: displaySellers },
  { path: `${mainPath}displayProducts`, router: displayProduct },
  { path: `${mainPath}enableSeller`, router: enableSeller },
  { path: `${mainPath}disableSeller`, router: disableSeller },
  { path: `${mainPath}denySeller`, router: denySeller },
  { path: `${mainPath}sellerDetails`, router: sellerDetails },
  { path: `${mainPath}sendMessage`, router: sendMessage },
  { path: `${mainPath}changePassword`, router: changePassword },
  { path: `${mainPath}editSeller`, router: editSeller },
  { path: `${mainPath}downloadPermit`, router: downloadPermit }
];
