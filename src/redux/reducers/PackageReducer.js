import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    admin_packages : false,
   selectedPackage : false,
   myPacakges : false,
   detailPackage : false,


   selectedActPackID: false,
   selectedPackName : false,
   selectedPackValue : false,
   wdAmmounts: false,
}

export const packageSlice = createSlice({
    name: ' packages',
    initialState,
    reducers: {
        setAdmin_packages: (state, action) => { // not used to prevent error only
            state.admin_packages = action.payload
        },
        setSelectedPackage: (state, action) => { // not used to prevent error only
            state.selectedPackage = action.payload
        },
        setMypackages: (state, action) => { // not used to prevent error only
            state.myPacakges = action.payload
        },
        setDetailPackage: (state, action) => { // not used to prevent error only
            state.detailPackage = action.payload
        },
        setSelectedActPackID: (state, action) => {
            state.selectedActPackID = action.payload
        },
        setSelectedPackName: (state, action) => {
            state.selectedPackName = action.payload
        },
        setWDAmounts: (state, action) => {
            state.wdAmmounts = action.payload
        },
        setSelectedPackValue: (state, action) => {
            state.selectedPackValue = action.payload
        },
        resetPackage: () => initialState
    }

})

export const { resetPackage,
    setAdmin_packages, setSelectedPackage,setMypackages,setDetailPackage, setSelectedActPackID, setSelectedPackName, setWDAmounts, 
    setSelectedPackValue
 } = packageSlice.actions

export default packageSlice.reducer
