import React, { useEffect, useState } from "react";


//import Script from 'next/script'

//import TradingViewWidget from 'react-tradingview-widget'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

export default function TradingView() {

  return (
    <>
      <div className="w-full h-[400px] px-2 md:px-24 mt-4 animated fadeIn">
        <TradingViewWidget
          symbol={'BINANCE:MATICUSDT'}
          theme={Themes.DARK}
          locale="en"
          autosize
          interval={"30"}
        />
      </div>
    </>
  )
}



