import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormEmail } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function EmailForgot() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch()
    const { userEmail } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 40) {
            dispatch(setFormEmail(value.trim()))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'email') {
            //    inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])

    // console.log(username)

    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <p className="mb-2 text-sm  text-white">Email :   </p>
                    <input type="text" className="h-[60px] bg-purple-900 w-full text-white border-b border-gray-500  py-2 px-3" ref={inputRef}
                        name="userEmail"
                        value={userEmail || ''}
                        onChange={handleChange}

                    />
                   {formError && formError.path === 'email' &&
                        <p className="text-yellow-300 ml-2 mt-2 text-sm animated backInLeft items-center flex">
                            {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                            <i className="icofont-arrow-right animate-ping  mr-2"></i>
                            {formError.message}
                        </p> 
                     }
                </div>
            </div>


        </>

    )
}



