import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormPassword } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'

//-------------------------------------------------------


export default function PasswordReg() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { password } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))

        const { name, value } = e.target
        if (value.length <= 50) {
            dispatch(setFormPassword(value))
        }
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'password') {
            // inputRef.current.focus()
            //  inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
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

    const handleModalKeyboard = () => {
        dispatch(setModalKeyboardPassword(true))
    }


    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    {/* <p className="mb-2 text-sm"> Create strong password at least 8 chars with Lowecase, Uppercase, number and special characters  </p> */}
                    <div className="flex justify-between">
                        <p className="mb-2 text-sm"> Create Password min 8 characters  </p>
                        {!showPassword ?
                            <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                                <p className="text-sm"> Hide </p><p>   <i className="icofont-eye-blocked text-xl ml-2" /></p>
                            </div> :
                            <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                                <p className="text-sm"> Show </p><p>   <i className="icofont-eye text-xl ml-2" /></p>
                            </div>}
                    </div>

                    <input autoComplete="off" type={!showPassword ? "password" : "text"} className="h-[60px] bg-purple-900 w-full text-white border-b border-gray-500  py-2 px-3" ref={inputRef}
                        name="password"
                        value={password || ''}
                        onChange={handleChange}
                    //  onClick={handleModalKeyboard}

                    />
                    {formError && formError.path === 'password' &&
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



