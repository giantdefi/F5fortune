import React, { } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router";


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------

export default function MenuCryptoGroup() {

    const router = useRouter()
    const dispatch = useDispatch()
    const { transactionMenu } = useSelector((state) => state.MainmenuReducer)

    const handleMovePage = (page) => {
        router.push(page)
    }

    return (
        <>


            <div className="flex justify-around">



                <button onClick={() => handleMovePage("/crypto/deposit-busd")}
                    className={transactionMenu === 1 ? "_btn_user_menu_active" : "_btn_user_menu"}
                >
                    <img src="/assets/img/busd-coin.png" alt="avatar" className="w-[23px] h-[23px] inline-block" />  Deposit BUSD</button>


                <button onClick={() => handleMovePage("/crypto/withdrawal-xbusd")}
                    className={transactionMenu === 3 ? "_btn_user_menu_active" : "_btn_user_menu"}
                >
                    <img src="/assets/img/xbusd.webp" alt="avatar" className="w-[23px] h-[23px] inline-block" />   WD XBUSD

                </button>



            </div>




        </>
    )
}



