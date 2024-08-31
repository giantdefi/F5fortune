import React, { useEffect, useState, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setFormConfirmPassword } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
//-------------------------------------------------------


export default function ConfirmPassword() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { confirmPassword } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 50) {
            dispatch(setFormConfirmPassword(value.trim()))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'confirmPassword') {
            inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen
            //  
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])

    const togglePassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <div className="flex justify-between">
                        <p className="mb-2 text-sm"> Confirm Password  </p>
                        {!showPassword ?
                            <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                                <p className="text-sm"> Hide </p><p>   <i className="icofont-eye-blocked text-xl ml-2" /></p>
                            </div> :
                            <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                                <p className="text-sm"> Show </p><p>   <i className="icofont-eye text-xl ml-2" /></p>
                            </div>}
                    </div>
                    <input type={!showPassword ? "password" : "text"} className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="confirmPassword"
                        value={confirmPassword || ''}
                        onChange={handleChange}

                    />
                    {formError && formError.path === 'confirmPassword' ?
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



