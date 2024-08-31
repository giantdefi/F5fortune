import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"


import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setSpinnerAtLogo } from 'redux/reducers/LoaderReducer'
import { setbackURLs } from 'redux/reducers/MainmenuReducer'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'
import { setBordingOnMainHeader, setShoWConnectWallet } from 'redux/reducers/SettingReducer'

//--------------------------------------

export default function Home() {

 const dispatch = useDispatch()
  const router = useRouter()
  const [spinner, setSpinner] = useState(false)
  const [toggle, setToggle] = useState(false)
  const { domain, title, desc } = useSelector((state) => state.GeneralReducer)
  const { isLogin, phone, email, toggleLogin } = useSelector((state) => state.AuthReducer)
  const { rightSidebar } = useSelector((state) => state.MainmenuReducer)


  useEffect(() => {
  
    dispatch(setMainMenuItem(1))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = () => {
    dispatch(setToggleLogin(false))
}

return (
  <>

    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>

   

    <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 ">


      <section className="relative min-h-screen bg-gray-400 dark:bg-[#111] animated fadeIn">

  
        <div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA "
          // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
        >
       

       <section className="min-h-screen bg-cover bg-center text-white py-20 " style={{ backgroundImage: 'url(/assets/img/bg/trading-bg.avif)' }}>
        <div className="container mx-auto text-center flex flex-col">
        <h1 className="text-5xl font-bold">FIVEFORTUNE </h1>
        <p className="text-3xl">Invest in the Future of Finance with </p>
        <p className="mt-4 text-2xl">The easiest way to invest in top-performing cryptocurrencies. Secure, transparent, and profitable</p>
           
        </div>
    </section>

        </div>
      </section>
    

    </body>

  </>
)
}



