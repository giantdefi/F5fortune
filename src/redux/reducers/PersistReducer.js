import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clockSize: 250,
    // allowSound: false,
    allowNewJoinPopup: true,
    newUserJoin: false, // username

    investmentPackage: false, // array object

}

export const PersistSlice = createSlice({
    name: 'persist', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        // setAllowSound: (state, action) => {
        //     state.allowSound = action.payload
        // },
        setNewUserJoin: (state, action) => {
            state.newUserJoin = action.payload
        },
        setClockSize: (state, action) => {
            state.clockSize = action.payload
        },
        setAllowNewJoinPopup: (state, action) => { // not yet used
            state.allowNewJoinPopup = action.payload // used already
        },
        setInvestmentPackage: (state, action) => { // consist 1 to 4
            state.investmentPackage = action.payload
        },
        resetPersist: () => initialState
    }

})

export const { resetPersist,
    setInvestmentPackage,
    setNewUserJoin, setClockSize
} = PersistSlice.actions


export default PersistSlice.reducer
