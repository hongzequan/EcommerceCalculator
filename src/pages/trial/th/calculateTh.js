import { getJsonData } from "@/services/initData";

//利润率相关单位数据
const { rate } = getJsonData("rate");

//计算售价
function getSellingPrice(price, s_rate) {
  const sellingPrice =
    price / (1 - s_rate - rate?.["tk-commission-TH"] / 100 - rate?.SFP / 100);
  return sellingPrice.toFixed(2);
}

//计算CPA
function getBreakEvenCPA(sellingPrice, s_rate) {
  const maxCpa = (sellingPrice * s_rate) / rate.USDtoTHB;
  return maxCpa.toFixed(2);
}

//计算Roas
function getBreakEvenRoas(s_rate) {
  if (s_rate === 1 || s_rate === 0) {
    // 检查 s_rate 是否等于 1 或 0
    return "--"; // 返回一个特定值，用于 s_rate = 1 或 0
  } else {
    const roas = (1 / s_rate) * (1 + rate.damage / 100);
    return roas.toFixed(2);
  }
}

//预期Roas s_rate 利润率
function getExpect(s_rate) {
  if (s_rate === 1 || s_rate === 0) {
    // 检查 s_rate 是否等于 1 或 0
    return "--"; // 返回一个特定值，用于 s_rate = 1 或 0
  } else {
    const roas = ((1 / s_rate) * (1 + rate.damage / 100)).toFixed(2);
    return roas > 0 ? roas : "--";
  }
}

//计算成本率 成本价/售价
function getCostRate(price, priceTHB) {
  const cr = ((priceTHB / price) * 100).toFixed(2);
  return cr > 0 ? cr + "%" : "--";
}

// 计算值
export function calculateTh(price) {
  if (price === undefined || price === null) {
    return []; // 如果 price 为空，返回空数组
  }

  let arr = [];
  const priceTHB = (price / rate.USDtoRMB) * rate.USDtoTHB; //出库价

  for (let i = 100; i >= 0; i--) {
    const sellingPrice = getSellingPrice(priceTHB, i / 100); //售价
    // 在循环中执行您的操作
    arr.push({
      rate: i + `%`,
      sellingPrice: sellingPrice > 0 ? sellingPrice : "--", //售价
      costRate: getCostRate(sellingPrice, priceTHB),
      maxCpa:
        getBreakEvenCPA(sellingPrice, i / 100) > 0
          ? getBreakEvenCPA(sellingPrice, i / 100)
          : "--", //cpa
      "breakEven-Roas": getBreakEvenRoas(i / 100),
      "breakEven-Roas-20": getExpect(i / 100 - 0.2),
      "breakEven-Roas-28": getExpect(i / 100 - 0.28),
    });
  }

  return arr;
}

//   if (Array.isArray(array) && array.length > 0) {
// data是一个数组并且包含至少一个值
// 在这里执行你的逻辑
// arr = array.map((item) => {
//   const deliveryPriceTHB = (
//     (Number(item?.deliveryPrice) / rate?.USDtoRMB) *
//     rate?.USDtoTHB
//   ).toFixed(2);
//   return {
//     ...item,

//     "deliveryPrice-RMB": Number(item?.deliveryPrice),
//     "deliveryPrice-THB": deliveryPriceTHB,

//     "sellingPrice-55": getSellingPrice(deliveryPriceTHB, 0.55),
//     "breakEven-CPA-55": getBreakEvenCPA(
//       getSellingPrice(deliveryPriceTHB, 0.55),
//       0.55
//     ),
//     "breakEven-Roas-55": getBreakEvenRoas(0.55),
//     "expect-55": getExpect(0.55),

//     "sellingPrice-45": getSellingPrice(deliveryPriceTHB, 0.45),
//     "breakEven-CPA-45": getBreakEvenCPA(
//       getSellingPrice(deliveryPriceTHB, 0.55),
//       0.45
//     ),
//     "breakEven-Roas-45": getBreakEvenRoas(0.45),
//     "expect-45": getExpect(0.45),

//     "sellingPrice-35": getSellingPrice(deliveryPriceTHB, 0.35),
//     "breakEven-CPA-35": getBreakEvenCPA(
//       getSellingPrice(deliveryPriceTHB, 0.55),
//       0.35
//     ),
//     "breakEven-Roas-35": getBreakEvenRoas(0.35),
//     "expect-35": getExpect(0.35),

//     "sellingPrice-25": getSellingPrice(deliveryPriceTHB, 0.25),
//     "breakEven-CPA-25": getBreakEvenCPA(
//       getSellingPrice(deliveryPriceTHB, 0.55),
//       0.25
//     ),
//     "breakEven-Roas-25": getBreakEvenRoas(0.25),
//     "expect-25": getExpect(0.25),
//   };
// });
//   } else {
//     // data不是数组，或者是一个空数组
//     // 可能需要抛出错误或返回一个默认值
//     console.error("Invalid data: must be a non-empty array");
//     return null; // 或者返回一个适当的默认值
//   }
