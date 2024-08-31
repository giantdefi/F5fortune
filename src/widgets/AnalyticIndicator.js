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


            {/* <div className="flex flex-row gap-2 justify-center">
                <button onClick={() => setPair('EURUSD')} className="_btn_forex_option">EURUSD</button>
                <button onClick={() => setPair('USDJPY')} className="_btn_forex_option">USDJPY</button>
                <button onClick={() => setPair('GOLS')} className="_btn_forex_option">GOLD</button>
            </div> */}

            <div className="flex flex-row p-2 gap-2 pb-10 h-full">
                <div className="w-1/2 border-1  border-red-500 flex">
                    <div id="tech1" className="h-full  w-full grid  ">
                        <TechnicalAnalysis
                            symbol={'USDJPY'}
                            interval={'1h'}
                            autoSize={true}
                            containerId={'tech1'}
                            colorTheme={'dark'}
                        />

                    </div>
                </div>

                <div className="w-1/2 border-1  border-red-500 flex">
                    <div id="tech2" className="h-full  w-full grid  ">
                        <TechnicalAnalysis
                            symbol={'EURUSD'}
                            interval={'1h'}
                            autoSize={true}
                            containerId={'tech2'}
                            colorTheme={'dark'}
                        />

                    </div>
                </div>
            </div>



        </>
    )
}



