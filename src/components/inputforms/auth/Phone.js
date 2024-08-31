import React, { useEffect, useState, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setFormPhone } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
//-------------------------------------------------------


export default function Phone() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { phone } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 18) {
            dispatch(setFormPhone(value))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'phone') {
            //   inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])



    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <span className="mb-2 text-sm">  Your WhatsApp with +XX Country Code  </span>
                    <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="phone"
                        value={phone || ''}
                        onChange={handleChange}

                    />
                    {formError && formError.path === 'phone' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



