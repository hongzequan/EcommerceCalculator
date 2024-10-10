import { getJsonData } from "@/services/initData";

const { rate } = getJsonData("rate");

export function calculateTh(data) {

    const { dataSource, allGMV, returns, serviceFee } = data;

    const arrGMV = dataSource.reduce((sum, item) => sum + parseInt(item.gmv), 0); //广告总GMV
    const arrNum = dataSource.reduce((sum, item) => sum + parseInt(item.num), 0); //广告总单量


    const newDataSource = dataSource.map(item => {
        const numRate = ((item.num / arrNum) * 100).toFixed(2) + '%';
        const gmvRate = ((item.gmv / arrGMV) * 100).toFixed(2) + '%';
        const cost = parseInt(item.cost) * rate?.USDtoTHB;
        const gmv = parseInt(item.gmv) * rate?.USDtoTHB;
        const revenue = allGMV * parseFloat(gmvRate) / 100;
        const returnPrice = returns * parseFloat(numRate) / 100;
        const serviceFeePrice = parseInt(serviceFee) * parseFloat(gmvRate) / 100;
        const profit = revenue - returnPrice - serviceFee

        return {
            ...item,
            numRate: numRate,//单量占比
            gmvRate: gmvRate,//GMV占比
            cost: cost.toFixed(2),//户消耗
            gmv: gmv.toFixed(2),//户GMV收入
            revenue: revenue.toFixed(2),//营收
            returnPrice: returnPrice.toFixed(2),//退损
            serviceFee: serviceFeePrice.toFixed(2),//佣金
            profit: profit.toFixed(2)//利润

        }
    })

    return newDataSource
}