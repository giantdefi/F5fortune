import React, { useEffect, useState } from "react";


//import Script from 'next/script'


import TechnicalAnalysis from 'react-tradingview-technical-analysis'

export default function AnalyticIndicator() {

    const [pair, setPair] = useState('USDJPY')
    const [reload, setReload] = useState(false)

    useEffect(() => {

        setReload(true)

        setTimeout(() => {
            setReload(false) // delay chart to prevent error
        }, 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pair])

    return (
        <>


            <div className="flex flex-row gap-2 justify-center">
                <button onClick={() => setPair('EURUSD')} className="_btn_forex_option">EURUSD</button>
                <button onClick={() => setPair('USDJPY')} className="_btn_forex_option">USDJPY</button>
                <button onClick={() => setPair('GOLS')} className="_btn_forex_option">GOLD</button>
            </div>

            <div className="flex flex-row h-screen  gap-2 ">
                <div className="flex w-1/2 border-4 border-red-500 h-full">
                    <div id="tech1" className="h-[2000px] w-full">
                        <TechnicalAnalysis
                            symbol={'USDJPY'}
                            interval={TechnicalAnalysis.THEMES.ONE_HOUR}
                            autoSize={true}
                            containerId={'tech1'}
                            height={2000}
                        />
                    </div>
                </div>

                <div className="flex w-1/2 border-4 border-red-500">
                    <div id="tech2">
                        <TechnicalAnalysis
                            symbol={'EURUSD'}
                            interval={TechnicalAnalysis.THEMES.ONE_HOUR}
                            autoSize={true}
                            containerId={'tech2'}
                        />
                    </div>
                </div>
            </div>



        </>
    )
}



