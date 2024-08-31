import React, { useEffect, useRef, useState } from "react"
import Router, { useRouter } from "next/router"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPopupNewUser } from 'redux/reducers/ModalReducer'
import { setLoadUsername } from 'redux/reducers/MtreeReducer'
import { setModalJoinBinary, setModalConvertPairing } from 'redux/reducers/ModalReducer' // for reset
//-------------------------------------------------------

export default function PopupNewUser() { // from NewUserJoinWithPopup.js in folder layout/main

    const outsideRef = useRef(null)
    const overlayRef = useRef(null)
    const router = useRouter()
    // redux store
    const dispatch = useDispatch()
    const { popupNewUser } = useSelector((state) => state.ModalReducer)
    const { newuser, sponsor, upline, icon, packages, value, timeAgo } = useSelector((state) => state.NewJoinReducer)

    const [clicked, setClicked] = useState(false)

    const handleModalClose = () => {
        document.body.classList.remove('overflow-hidden') // prevent body scroll on modal open
        if(outsideRef.current){
            outsideRef.current.classList.add('zoomOut');
            overlayRef.current.classList.add('fadeOut');
            }
        setTimeout(() => { // delay close to enable animation working first
            dispatch(setPopupNewUser(false))
        }, 500)
    }


    useEffect(() => {
        if (popupNewUser) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        handleModalClose()
                        document.body.classList.remove('overflow-hidden')
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 100)
        }

        setTimeout(() => {
            handleModalClose()
          }, 10000) 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupNewUser])


    const handelJumpToBinary = (user) => {
        setClicked(true)

        setTimeout(() => {
            handleModalClose()
            dispatch(setModalJoinBinary(false)) // if this modal open
            dispatch(setModalConvertPairing(false)) // if this modal open
            dispatch(setLoadUsername(user))
            setTimeout(() => {
                router.push('/users/m-tree') // prevent flashing
            })
        })
    }

    return (
        <>

            <div className="_modal_user_join left-2 animated" ref={overlayRef}>
                <div className="relative shadow-full    animated fadeInUp min-w-[280px]"
                    ref={outsideRef} >

                   
                    <div  className="_gradient_purple cursor-pointer 
                    relative text-white flex flex-row items-center px-1 rounded-xl border-2 border-gray-300"> 
                        <div className="flex items-center ">
                            {!clicked ?
                                icon ?
                                    <img src={`/assets/img/maneki/${icon}`} alt="maneki" className="rounded-full  w-[60px] h-[60px] animate-pulse" />
                                    :
                                    <img src="/assets/img/user.webp" alt="avatar" className="rounded-full border-2 border-gray-400  w-[60px] h-[60px] animate-pulse" />
                                :

                                <svg style={{ width: 60 }} role="status" className="px-2 inline  text-gray-200 dark:text-gray-300 animate-spin  fill-green-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            }

                            <div className="w-full flex flex-col mt-1 items-left min-w-[200px]">
                               <p className="ml-2 text-white text-sm bold">New Join Network</p>
                                <p className="ml-2 text-white">
                                    <span className="text-sm">{newuser}</span>  <span className="text-[14px] text-yellow-300"> - <span className="bold">{value}</span></span></p>
                                <p className="ml-2 text-xs text-white">Upline : {upline}</p>
                                <p className="ml-2 text-xs text-white">Sponsor : {sponsor}</p>
                                <div className="flex justify-between items-center w-full">
                                    <p className="ml-2 text-[10px] text-yellow-200"><i>{timeAgo}</i></p>
                                    {/* <p className="-mr-2 text-[12px] border bg-pink-700 px-2 rounded-lg mb-1 bold"><i className="icofont-arrow-right"></i> M-tree</p> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

