import Cookies from "js-cookie";
import { CONFIG } from "../../../../config-global";
import axiosInstance, { endpoints } from "../../../../utils/axios";

export type SignInQuery = {
  email: string;
  password: string;
};

export const signInAction = async ({
  email,
  password,
}: SignInQuery): Promise<TypeLogin | undefined> => {
  try {
    const serializedDto = JSON.stringify({ email, password });

    const res = await axiosInstance.post(
      `${CONFIG.site.apiUrl}${endpoints.signIn}`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: currentAccessToken,
        },
      }
    );

    if (res.data?.data?.token) {
      Cookies.set("token", res.data.data.token, { expires: 30 / 1440 });
    }

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: 500,
        status: "error",
        data: { token: "" },
        message: error.message,
      };
    } else {
      return {
        code: 500,
        status: "error",
        data: { token: "" },
        message: "ระบบไม่สามารถใช้งานได้ในขณะนนี้",
      };
    }
  }
};

export interface TypeLogin {
  code: number;
  status: string;
  data: Data;
  message: null | string;
}

export interface Data {
  token: string;
}
