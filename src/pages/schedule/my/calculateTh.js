import { getJsonData } from "@/services/initData";

//利润率相关单位数据
const { rate } = getJsonData("rate");

//计算售价 出库价、利润率
function getSellingPrice(price, s_rate) {
  const sellingPrice =
    price / (1 - s_rate - rate?.["tk-commission-TH"] / 100 - rate?.SFP / 100);
  return sellingPrice.toFixed(2);
}

//计算CPA
function getBreakEvenCPA(sellingPrice, s_rate) {
  const maxCpa = (sellingPrice * s_rate) / rate?.USDtoTHB;
  return maxCpa.toFixed(2);
}

//计算Roas
function getBreakEvenRoas(s_rate) {
  const roas = (1 / s_rate) * (1 + rate?.damage / 100);
  return roas.toFixed(2);
}

//预期Roas 20%
function getExpect(s_rate) {
  const roas = (1 / (s_rate - 0.2))* (1 + rate?.damage / 100);
  return roas.toFixed(2);
}

export function calculateTh(array) {
  console.log(array,'array')
  let arr = [];
  if (Array.isArray(array) && array.length > 0) {
    // data是一个数组并且包含至少一个值
    // 在这里执行你的逻辑
    // TODO
    arr = array.map((item) => {
      const deliveryPriceTHB = (
        (Number(item?.deliveryPrice)*rate.RMBtoTHB)
      ).toFixed(2);
      return {
        ...item,

        "deliveryPrice-RMB": Number(item?.deliveryPrice),
        "deliveryPrice-THB": deliveryPriceTHB,

        "sellingPrice-55": getSellingPrice(deliveryPriceTHB, 0.55),
        "breakEven-CPA-55": getBreakEvenCPA(
          getSellingPrice(deliveryPriceTHB, 0.55),
          0.55
        ),
        "breakEven-Roas-55": getBreakEvenRoas(0.55),
        "expect-55": getExpect(0.55),

        "sellingPrice-45": getSellingPrice(deliveryPriceTHB, 0.45),
        "breakEven-CPA-45": getBreakEvenCPA(
          getSellingPrice(deliveryPriceTHB, 0.45),
          0.45
        ),
        "breakEven-Roas-45": getBreakEvenRoas(0.45),
        "expect-45": getExpect(0.45),

        "sellingPrice-40": getSellingPrice(deliveryPriceTHB, 0.40),
        "breakEven-CPA-40": getBreakEvenCPA(
          getSellingPrice(deliveryPriceTHB, 0.40),
          0.40
        ),
        "breakEven-Roas-40": getBreakEvenRoas(0.40),
        "expect-40": getExpect(0.40),
        
        "sellingPrice-35": getSellingPrice(deliveryPriceTHB, 0.35),
        "breakEven-CPA-35": getBreakEvenCPA(
          getSellingPrice(deliveryPriceTHB, 0.35),
          0.35
        ),
        "breakEven-Roas-35": getBreakEvenRoas(0.35),
        "expect-35": getExpect(0.35),

        "sellingPrice-25": getSellingPrice(deliveryPriceTHB, 0.25),
        "breakEven-CPA-25": getBreakEvenCPA(
          getSellingPrice(deliveryPriceTHB, 0.25),
          0.25
        ),
        "breakEven-Roas-25": getBreakEvenRoas(0.25),
        "expect-25": getExpect(0.25),
      };
    });
  } else {
    // data不是数组，或者是一个空数组
    // 可能需要抛出错误或返回一个默认值
    console.error("data不是数组，或者是一个空数组");
    return null; // 或者返回一个适当的默认值
  }
  return arr;
}
