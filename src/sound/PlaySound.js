import React, { useEffect, useState, useRef } from "react"


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//--------------------------------------

export default function PlaySound() {

    const soundError = useRef(null)
    const soundClick = useRef(null)
    const soundPling = useRef(null)
    const soundVerified = useRef(null)
    const soundTransfer = useRef(null)
    const soundSuccess = useRef(null)
    const soundLogin = useRef(null)
    const soundGood = useRef(null)

    const dispatch = useDispatch()
    const { allowSound } = useSelector((state) => state.SettingReducer)
    const { soundEffect } = useSelector((state) => state.SoundReducer)

    const playSound = () => {
        let elm
        try {

            if (soundEffect === 'error') {
                elm = soundError.current
                elm.play()
            }
            if (soundEffect === 'click') {
                elm = soundClick.current
                elm.play()
            }
            if (soundEffect === 'pling') {
                elm = soundPling.current
                elm.play()
            }
            if (soundEffect === 'verified') {
                elm = soundVerified.current
                elm.play()
            }
            if (soundEffect === 'transfer') {
                elm = soundTransfer.current
                elm.play()
            }
            if (soundEffect === 'success') {
                elm = soundSuccess.current
                elm.play()
            }
            if (soundEffect === 'login') {
                elm = soundLogin.current
                elm.play()
            }
            if (soundEffect === 'good') {
                elm = soundGood.current
                elm.play()
            }

        } catch (error) {
            console.log(error)
            // return res.status(400).json({ isSuccess: 'fail', message: error })
        }

    }

    useEffect(() => { // check Balance
        if (allowSound) {

            try {
                playSound()
            } catch (error) {
                console.log(error)
                // return res.status(400).json({ isSuccess: 'fail', message: error })
            }

            setTimeout(() => {
                dispatch(setPlaySound(false))
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soundEffect, allowSound])

    return (
        <>
            <audio ref={soundError}
                // controls
                src="/sound/error.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundClick}
                // controls
                src="/sound/beep.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundPling}
                src="/sound/pling.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundVerified}
                src="/sound/verified.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundTransfer}
                src="/sound/transfer.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundSuccess}
                src="/sound/success.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundLogin}
                src="/sound/login.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            <audio ref={soundGood}
                src="/sound/good.mp3">
                Your browser does not support the
                <code>audio</code> element.
            </audio>

        </>
    )
}



