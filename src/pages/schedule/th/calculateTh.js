
import { getJsonData } from '@/services/initData';

//利润率相关单位数据
const { rate } = getJsonData('rate');

function getSellingPrice(price, s_rate) {
    const sellingPrice = price / (1 - s_rate - rate?.['tk-commission-TH'] / 100 - rate?.SFP / 100)
    return sellingPrice.toFixed(2)
}


function getBreakEvenCPA(sellingPrice, s_rate) {
    const maxCpa = sellingPrice * s_rate / rate.USDtoTHB;
    return maxCpa.toFixed(2)
}

export function calculateTh(array) {
    let arr = []
    if (Array.isArray(array) && array.length > 0) {
        // data是一个数组并且包含至少一个值
        // 在这里执行你的逻辑
        arr = array.map((item) => {

            const deliveryPriceTHB = (Number(item?.deliveryPrice) / rate?.USDtoRMB * rate?.USDtoTHB).toFixed(2)
            return {
                ...item,

                'deliveryPrice-RMB': Number(item?.deliveryPrice),
                'deliveryPrice-THB': deliveryPriceTHB,

                'sellingPrice-55': getSellingPrice(deliveryPriceTHB, 0.55),
                'breakEven-CPA-55': getBreakEvenCPA(getSellingPrice(deliveryPriceTHB, 0.55), 0.55),
                'breakEven-Roas-55': "",
                'expect-55': "",

                'sellingPrice-45': getSellingPrice(deliveryPriceTHB, 0.45),
                'breakEven-CPA-45': getBreakEvenCPA(getSellingPrice(deliveryPriceTHB, 0.55), 0.45),
                'breakEven-Roas-45': "",
                'expect-45': "",

                'sellingPrice-35': getSellingPrice(deliveryPriceTHB, 0.35),
                'breakEven-CPA-35': getBreakEvenCPA(getSellingPrice(deliveryPriceTHB, 0.55), 0.35),
                'breakEven-Roas-35': "",
                'expect-35': "",

                'sellingPrice-25': getSellingPrice(deliveryPriceTHB, 0.25),
                'breakEven-CPA-25': getBreakEvenCPA(getSellingPrice(deliveryPriceTHB, 0.55), 0.25),
                'breakEven-Roas-25': "",
                'expect-25': "",
            }
        })
    } else {
        // data不是数组，或者是一个空数组
        // 可能需要抛出错误或返回一个默认值
        console.error('Invalid data: must be a non-empty array');
        return null; // 或者返回一个适当的默认值
    }
    return arr;
}
