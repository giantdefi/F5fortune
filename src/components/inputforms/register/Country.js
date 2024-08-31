import React, { useEffect, useState, useRef, useMemo } from "react";

import Select from 'react-select'
import countryList from 'react-select-country-list'


//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setCountry } from 'redux/reducers/FormReducer';
//import { setError } from 'redux/reducers/ErrorReducer';
//-------------------------------------------------------


export default function Country() {

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();

    const { formError } = useSelector((state) => state.ErrorReducer)

    //console.log(value)

    useEffect(() => {
        if (value) {
            dispatch(setCountry(value.label))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'country') {
            // inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen
            //  
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    const changeHandler = value => {
        setValue(value)
    }

    const customStyles = {
        option: (base, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...base,

                backgroundColor: isFocused ? "gray" : "#1e293b",
                // color: isSelected ? "#fff" : "#fff",
            }
        }
    };

    return (
        <>
            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">
                    <div className="flex flex-col ">
                        <p className="text-sm" ref={inputRef}> Select your Country  </p>
                        <p className="mb-2 text-sm text-yellow-400"> Make sure you are not United State Residence!  </p>
                    </div>

                    <Select
                        options={options}
                        value={value}
                        onChange={changeHandler}
                        styles={customStyles}

                    />

                    {formError && formError.path === 'country' ?
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



