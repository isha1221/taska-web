import cookie from "cookiejs";

export const setCookie = (userId: number) => {
  cookie("userId", `${userId}`, 1);
};

export const getCookie = (cookieName: string) => {
  cookie.get(cookieName);
};
