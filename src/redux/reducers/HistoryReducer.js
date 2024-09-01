import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
    WDCashArray : false,
    WDCashTx : false,
    WDCashTotal : false,
    totalWDPaid : false,
}

export const historySlice = createSlice({
    name: 'history', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setWDCashArray: (state, action) => {
            state.WDCashArray = action.payload
        },
        setWDCashTx: (state, action) => {
            state.WDCashTx = action.payload
        },
        setWDCashTotal: (state, action) => {
            state.WDCashTotal = action.payload
        },
        setTotalWDPaid: (state, action) => {
            state.totalWDPaid = action.payload
        },
        
 

        resetHistory: () => initialState
    }

})

export const {  resetHistory, setWDCashArray, setWDCashTx, setWDCashTotal, setTotalWDPaid


} = historySlice.actions

export default historySlice.reducer
