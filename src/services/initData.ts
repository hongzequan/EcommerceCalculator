import { getRepos } from "@/services/product";
import { setLocalStorage, getLocalStorage } from "@/tools";

// const initData = {
//     product: await getRepos(),
//     rate: {
//         USD: 1,
//         USDtoRMB: 7.08,
//         USDtoMY: 4.32,
//         USDtoTHB: 33.7,
//         'tk-commission-TH': 7.53,
//         'tk-commission-MY': 7.53,
//         SFP: 3,
//         damage: 10
//     }
// }
const productList = getRepos();
const rate = {
  USD: 1,
  USDtoRMB: 7.0763,
  USDtoMY: 4.2925,
  USDtoID: 15728.36,
  USDtoTHB: 33.13,
  RMBtoTHB: 4.6812,
  RMBtoRM: 0.6066,
  RMBtoID: 2206.16,
  "tk-commission-TH": 7.53,
  "tk-commission-MY": 7.53,
  "tk-commission-ID": 7.53,
  SFP: 3,
  damage: 20,
};

export function getJsonData() {
  return {
    productList: getLocalStorage("product"),
    rate: getLocalStorage("rate"),
  };
}

//存数据
export async function setJsonData(key?: any, value?: any) {
  console.log(key, "key", value);
  if (key) {
    key === "rate" && setLocalStorage("rate", value);
    key === "product" && setLocalStorage("product", value);
  } else {
    setLocalStorage("rate", rate);
    setLocalStorage("product", productList);
  }
}

//判断数据是否存在缓存中
export function checkAllKeysInLocalStorage(...keys) {
  return keys.every((key) => localStorage.getItem(key) !== null);
}
