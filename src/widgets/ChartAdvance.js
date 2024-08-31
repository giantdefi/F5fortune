import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { AdvancedChart, SingleTicker } from "react-tradingview-embed";

export default function ChartAdvance() {

    const [pair, setPair] = useState('OANDA:XAUUSD')

    const { selectedPair } = useSelector((state) => state.CalculatorReducer)


    useEffect(() => {
        if (selectedPair === 'GOLD') {
            setPair('OANDA:XAUUSD')
        } else {
            setPair('FX:EURUSD')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPair])


    return (
        <>

            <div className="flex flex-row gap-2 justify-center">
                {/* <button onClick={() => setPair('OANDA:XAUUSD')} className="_btn_forex_option">XAUUSD GOLD</button>
                <button onClick={() => setPair('FX:EURUSD')} className="_btn_forex_option">EURUSD</button> */}
                {/* <button onClick={() => setPair('FX:USDJPY')} className="_btn_forex_option">USDJPY</button> */}

            </div>

            {/* <SingleTicker
                widgetProps={{ "symbol": pair, "height": 50 }}
            /> */}

            <AdvancedChart
                //  widgetPropsAny={{ "newProp": true }}
                widgetProps={{
                    "theme": "dark", "symbol": pair, "range": "240", "interval": "1W",

                }} />


        </>
    )
}



