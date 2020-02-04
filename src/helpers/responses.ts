import { MLShopAdminResponse } from "./responses";
import { StringOrNumber, StringOrNull } from "./types";
import { Router } from "express";
export interface MLShopAdminResponse {
  ResponseCode: number;
  ResponseMessage: string;
}

export interface LoginResponse extends MLShopAdminResponse {
  loginData?: {
    BranchCode: StringOrNumber;
    RoleID: string;
    UserLogin: string;
    UserPassword: string;
    ZoneCode: number;
    active: StringOrNull;
    divCode: StringOrNumber;
    fullname: StringOrNull;
    resign: StringOrNull;
    resourceID: number;
    station: StringOrNull;
    stationCode: StringOrNull;
    token: string;
  };
}

export interface DisplaySellerResponse extends MLShopAdminResponse {
  Seller_List?: [];
}

export interface DisplayProductResponse extends MLShopAdminResponse {
  Products_List?: [];
}

export interface SellerDetailResponse extends MLShopAdminResponse {
  result?: {
    merchantID: StringOrNumber;
    sellerName: string;
    shopName: string;
    email: string;
    password: string;
    status: StringOrNumber;
    storeAddress: string;
    city: string;
    country: string;
    contactNumber: StringOrNumber;
    storeDesciption: string;
    zipcode: StringOrNumber;
    storeDetails: string;
    storePolicies: string;
    paymentMethod: StringOrNull;
    syscreated: StringOrNull;
    sysmodified: StringOrNull;
  };
}

export interface AdminRoutes {
  path: string;
  router: Router;
}
