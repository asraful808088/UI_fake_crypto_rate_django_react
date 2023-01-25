import asyncio
import json
import random

from channels.consumer import AsyncConsumer
from channels.exceptions import StopConsumer


class GetCryptoCoinRate(AsyncConsumer):
   async  def websocket_connect(self,event):
        self.cryptoCoin={
            "BTC":random.uniform(20000.5, 40000.5),
            "ETH":random.uniform(1000.5,4000.5),
            "USDT":random.uniform(1.5, 3.5),
            "BNB":random.uniform(30.5, 75.5),
            "USDC":random.uniform(1.5, 5.5),
            "XRP":random.uniform(40.5, 55.5),
            "BUSD":random.uniform(40.5, 55.5),
            "ADA":random.uniform(30.5, 75.5),
            "LTC":random.uniform(50.5, 70.5),
            }
        await self.send({
            'type':'websocket.accept'
        })

   async  def websocket_disconnect(self,event):
    try:
        if self.cryptoLoop.isRunning:
            self.cryptoLoop.cancel()
    except:
        pass   
    
    raise StopConsumer()

   async def rateLoop(self):
        self.cryptoLoop.isRunning = True
        while True:
           
            currentCryptoCoin={
            "BTC":random.uniform(20000.5, 40000.5),
            "ETH":random.uniform(1000.5,40000.5),
            "USDT":random.uniform(1.5, 3.5),
            "BNB":random.uniform(30.5, 75.5),
            "USDC":random.uniform(1.5, 5.5),
            "XRP":random.uniform(40.5, 55.5),
            "BUSD":random.uniform(40.5, 55.5),
            "ADA":random.uniform(30.5, 75.5),
            "LTC":random.uniform(50.5, 70.5),
            }
            await self.send({
                'type':'websocket.send',
                'text':json.dumps({
                    'currentCryptoCoin':currentCryptoCoin,
                    "pRate":{
                        "BTC": random.uniform(0.5, 99),
                        "ETH": random.uniform(0.5, 99),
                        "USDT": random.uniform(0.5, 99),
                        "BNB": random.uniform(0.5, 99),
                        "USDC": random.uniform(0.5, 99),
                        "XRP": random.uniform(0.5, 99),
                        "BUSD": random.uniform(0.5, 99),
                        "ADA":random.uniform(0.5, 99),
                        "LTC": random.uniform(0.5, 99),
                    }
                    ,
                    "lossOrProfit":{
                        "BTC": currentCryptoCoin["BTC"] - currentCryptoCoin["BTC"],
                        "ETH": self.cryptoCoin["ETH"] - currentCryptoCoin["ETH"],
                        "USDT": self.cryptoCoin["USDT"] - currentCryptoCoin["USDT"],
                        "BNB": self.cryptoCoin["BNB"] - currentCryptoCoin["BNB"],
                        "USDC": self.cryptoCoin["USDC"] - currentCryptoCoin["USDC"],
                        "XRP": self.cryptoCoin["XRP"] - currentCryptoCoin["XRP"],
                        "BUSD": self.cryptoCoin["BUSD"] - currentCryptoCoin["BUSD"],
                        "ADA": self.cryptoCoin["ADA"] - currentCryptoCoin["ADA"],
                        "LTC": self.cryptoCoin["LTC"] - currentCryptoCoin["LTC"],
                    }

                })
            })
            self.cryptoCoin = currentCryptoCoin
            await asyncio.sleep(5)


            
   async  def websocket_receive(self,event):
    self.cryptoLoop = asyncio.create_task(self.rateLoop()) 
        
        