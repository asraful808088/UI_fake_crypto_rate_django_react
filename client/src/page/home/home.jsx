import React, { useEffect, useState } from "react";
import Card from "../../component/card/card";
import style from "./style.module.css";

export default function Home() {
  const [data, setData] = useState({
    currentCryptoCoin: {},
    pRate: {},
    lossOrProfit: {},
  });
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/crypto");
    ws.onopen = (e) => {
      ws.send("get cryptpo rate");
    };
    ws.onmessage = (e) => {
      const praseJson = JSON.parse(e.data);
      console.log(praseJson);
      setData(praseJson);
    };
    setTimeout(() => {}, 2000);
  }, []);

  return (
    <div className={style.root}>
      <header>Fake Crypto Rate {"(UI)"}</header>
      <div className={style.cardBox}>
        <Card
          pRate={data.pRate.BTC}
          name="BTC"
          rate={data.currentCryptoCoin.BTC}
          isLoss={data.lossOrProfit.BTC}
        />
        <Card
          pRate={data.pRate.ETH}
          name="ETH"
          rate={data.currentCryptoCoin.ETH}
          isLoss={data.lossOrProfit.ETH}
        />
        <Card
          pRate={data.pRate.USDT}
          name="USDT"
          rate={data.currentCryptoCoin.USDT}
          isLoss={data.lossOrProfit.USDT}
        />
        <Card
          pRate={data.pRate.BNB}
          name="BNB"
          rate={data.currentCryptoCoin.BNB}
          isLoss={data.lossOrProfit.BNB}
        />
        <Card
          pRate={data.pRate.USDC}
          name="USDC"
          rate={data.currentCryptoCoin.USDC}
          isLoss={data.lossOrProfit.USDC}
        />
        <Card
          pRate={data.pRate.XRP}
          name="XRP"
          rate={data.currentCryptoCoin.XRP}
          isLoss={data.lossOrProfit.XRP}
        />
        <Card
          pRate={data.pRate.BUSD}
          name="BUSD"
          rate={data.currentCryptoCoin.BUSD}
          isLoss={data.lossOrProfit.BUSD}
        />
        <Card
          pRate={data.pRate.ADA}
          name="ADA"
          rate={data.currentCryptoCoin.ADA}
          isLoss={data.lossOrProfit.ADA}
        />
        <Card
          pRate={data.pRate.LTC}
          name="LTC"
          rate={data.currentCryptoCoin.LTC}
          isLoss={data.lossOrProfit.LTC}
        />
      </div>
    </div>
  );
}
