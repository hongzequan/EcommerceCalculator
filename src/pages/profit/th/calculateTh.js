import { getJsonData } from "@/services/initData";

const { rate } = getJsonData("rate");

export function calculateTh(data) {
  const { dataSource, allGMV, returns, serviceFee, financeRMB } = data;

  const arrGMV = dataSource.reduce((sum, item) => sum + parseFloat(item.gmv), 0); //广告总GMV
  const arrNum = dataSource.reduce((sum, item) => sum + parseFloat(item.num), 0); //广告总单量


  //计算人员利润分配
  const newDataSource = dataSource.map((item) => {
    const numRate = ((item.num / arrNum) * 100).toFixed(2) + "%";
    const gmvRate = ((item.gmv / arrGMV) * 100).toFixed(2) + "%";
    const cost = parseFloat(item.cost) * rate?.USDtoTHB;
    const gmv = parseFloat(item.gmv) * rate?.USDtoTHB;
    const revenue = (allGMV * parseFloat(gmvRate)) / 100;
    const returnPrice = (returns * parseFloat(numRate)) / 100;
    const serviceFeePrice = (parseFloat(serviceFee) * parseFloat(gmvRate)) / 100;
    const profit = revenue - returnPrice - serviceFeePrice - cost;
    const profitRMB = profit / rate?.RMBtoTHB;

    return {
      ...item,
      numRate: numRate, //单量占比
      gmvRate: gmvRate, //GMV占比
      cost: cost.toFixed(2), //户消耗
      gmv: gmv.toFixed(2), //户GMV收入
      revenue: revenue.toFixed(2), //营收
      returnPrice: returnPrice.toFixed(2), //退损
      serviceFee: serviceFeePrice.toFixed(2), //佣金
      profit: profit.toFixed(2), //利润泰铢
      profitRMB: profitRMB.toFixed(2), //利润泰铢
    };
  });

  const allProfit = newDataSource.reduce((sum, item) => sum + parseFloat(item.profitRMB), 0); //人员总利润

  //计算人员利润占比分配
  const lastData = newDataSource.map((item) => {
    const profitRMBRate = ((parseFloat(item.profitRMB) / allProfit) * 100).toFixed(2) + "%";
    const lastProfit = (parseFloat(financeRMB) * (parseFloat(item.profitRMB) / allProfit)).toFixed(2)
    
    return {
      ...item,
      profitRMBRate: profitRMBRate,
      lastProfit: lastProfit
    }
  })

  return lastData;
}
