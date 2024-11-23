import { getJsonData } from "@/services/initData";

//利润率相关单位数据
const { rate } = getJsonData("rate");

//计算售价
function getSellingPrice(price, s_rate) {
  const sellingPrice =
    price / (1 - s_rate - rate?.["tk-commission-ID"] / 100 );
  return sellingPrice.toFixed(2);
}

//计算CPA
function getBreakEvenCPA(sellingPrice, s_rate) {
  const maxCpa = (sellingPrice * s_rate) / rate?.USDtoID;
  return maxCpa.toFixed(2);
}

//计算Roas
function getBreakEvenRoas(s_rate) {
  if (s_rate === 1 || s_rate === 0) {
    // 检查 s_rate 是否等于 1 或 0
    return "--"; // 返回一个特定值，用于 s_rate = 1 或 0
  } else {
    const roas = (1 / s_rate) * (1 + rate?.damage / 100);
    return roas.toFixed(2);
  }
}

//预期Roas s_rate 利润率
function getExpect(s_rate) {
  if (s_rate === 1 || s_rate === 0) {
    // 检查 s_rate 是否等于 1 或 0
    return "--"; // 返回一个特定值，用于 s_rate = 1 或 0
  } else {
    const roas = ((1 / s_rate) * (1 + rate?.damage / 100)).toFixed(2);
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
  const priceID = price * rate?.RMBtoID; //出库价

  for (let i = 100; i >= 0; i--) {
    const sellingPriceID = getSellingPrice(priceID, i / 100); //售价ID
    const sellingPriceUSD = getSellingPrice(price / rate?.USDtoRMB, i / 100); //售价ID

    // 在循环中执行您的操作
    arr.push({
      rate: i + `%`,
      sellingPrice: sellingPriceUSD > 0 ? sellingPriceUSD : "--",
      'sellingPrice-id': sellingPriceID > 0 ? sellingPriceID : "--", //售价
      costRate: getCostRate(sellingPriceID, priceID),
      maxCpa:
        getBreakEvenCPA(sellingPriceID, i / 100) > 0
          ? getBreakEvenCPA(sellingPriceID, i / 100)
          : "--", //cpa
      "breakEven-Roas": getBreakEvenRoas(i / 100),
      "breakEven-Roas-20": getExpect(i / 100 - 0.2),
      "breakEven-Roas-28": getExpect(i / 100 - 0.28),
    });
  }

  return arr;
}
