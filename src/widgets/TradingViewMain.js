import React, { useEffect, useState } from "react";


//import Script from 'next/script'

//import TradingViewWidget from 'react-tradingview-widget'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

export default function TradingViewMain() {

    const [pair, setPair] = useState('FX:USDJPY')

    return (
        <>

            {/* <TradingViewWidget symbol="FX:USDJPY" /> */}
            {/* <div className="flex flex-row gap-2 justify-center">
                <button onClick={() => setPair('FX:EURUSD')} className="_btn_forex_option">EURUSD</button>
                <button onClick={() => setPair('FX:USDJPY')} className="_btn_forex_option">USDJPY</button>
                <button onClick={() => setPair('OANDA:XAUUSD')} className="_btn_forex_option">GOLD-OANDA</button>
            </div> */}

            <TradingViewWidget
                symbol={pair}
                theme={Themes.DARK}
                locale="en"
                autosize
                interval={"D"}

            />


        </>
    )
}



