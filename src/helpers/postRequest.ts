import { StringOrNumber } from "./types";

export interface LoginBody {
  username: string;
  password: string;
}

export interface ChangePasswordBody {
  merchantID: StringOrNumber;
  email: string;
}

export interface DenySellerBody {
  merchantID: StringOrNumber;
  email: string;
}

export interface EnableSellerBody {
  merchantID: StringOrNumber;
  email: string;
}

export interface SellerDetailsBody {
  merchantID: StringOrNumber;
}

export interface SendMessageBody {
  sellerEmail: string;
  message: string;
}

export interface DisableSellerBody {
  merchantID: StringOrNumber;
  email: string;
}

export interface EditSellerBody {
  merchantID: StringOrNumber;
  merchantName: string;
  shopName: string;
  storeAddress: string;
  city: string;
  contactNumber: StringOrNumber;
  country: string;
  email: string;
  storeDescription: string;
}

export interface DownloadQry {
  shopName: string;
  permitType: string;
}
