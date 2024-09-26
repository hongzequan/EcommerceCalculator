import type { LoginParams, LoginResult, UserInfo } from "@/interfaces/user";
import { clearLocalStorage, getLocalStorage } from "@/tools";
import { error } from "console";
const adminInfo: UserInfo = {
  name: "Admin",
  avatar: "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
  userid: "00000001",
  userType: "admin",
};
const userInfo: UserInfo = {
  name: "User",
  avatar: "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
  userid: "00000002",
  userType: "user",
};
const userMap = {
  admin: adminInfo,
  user: userInfo
}
let currentUserInfo: UserInfo | {} = userInfo;

const waitTime = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export async function login(data: LoginParams): Promise<LoginResult> {
  // return await request.post('/login', data);
  const { username, password } = data;
  await waitTime();
  if (username === "fz" && password === "123456") {
    currentUserInfo = adminInfo;
    return {
      success: true,
      userType: "admin",
    };
  }
  if (username === "user" && password === "123456") {
    currentUserInfo = userInfo;
    return {
      success: true,
      userType: "user",
    };
  }
  currentUserInfo = {};
  return {
    success: false,
    userType: "guest",
  };
}

export async function fetchUserInfo(userType) {
  const user = getLocalStorage("user"); //获取缓存的用户信息
  //如果缓存里没有，就从登录的类型里取一个出来
  return user != null ? user : userMap[userType]
}

export async function logout() {
  // return await request.post('/logout');
  console.log("logout");
  clearLocalStorage();
}
