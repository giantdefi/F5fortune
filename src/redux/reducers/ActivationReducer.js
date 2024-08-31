import { createSlice } from '@reduxjs/toolkit'

const initialState = {


    isActivateAction: false,
    activateUsername: false,
    //  activateSponsor: false, // not use
    activateUpline: false,
    activatePosition: false,


    //Activation

    // selectedEpinPackage: false,
    // selectedEpinValue: false,
    // selectedEpinID: false,
    // selectedEpinGas: false,


    isUserHasChecked: false,
    isUserActive: false, // not use
    isSponsorActive: false, // not use

    isCancelActivate: false, // prevent reload user on m-tree page is revisit

}

export const ActivationSlice = createSlice({
    name: 'activation', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {

        setActivationAction: (state, action) => {
            state.isActivateAction = action.payload
        },
        setActivationUsername: (state, action) => {
            state.activateUsername = action.payload
        },
        setActivationUpline: (state, action) => {
            state.activateUpline = action.payload
        },
        setActivationPosition: (state, action) => {
            state.activatePosition = action.payload
        },
        setIsUserActive: (state, action) => {
            state.isUserActive = action.payload
        },

        setSelectedEpinID: (state, action) => {
            state.selectedEpinID = action.payload
        },
        setSelectedEpinPackage: (state, action) => {
            state.selectedEpinPackage = action.payload
        },
        setSelectedEpinValue: (state, action) => {
            state.selectedEpinValue = action.payload
        },
        // setSelectedEpinGas: (state, action) => {
        //     state.selectedEpinGas = action.payload
        // },

        setIsUserHasChecked: (state, action) => {
            state.isUserHasChecked = action.payload
        },
        setIsSponsorActive: (state, action) => {
            state.isSponsorActive = action.payload
        },
        setIsCancelActivate: (state, action) => {
            state.isCancelActivate = action.payload
        },

        resetActivation: () => initialState
    }

})

export const { resetActivation, setActivationAction,
    setActivationUpline, setActivationPosition, setIsSponsorActive,
     setSelectedEpinPackage, setSelectedEpinValue, setSelectedEpinID, setSelectedEpinGas,
    setActivationUsername, setIsUserHasChecked, setMyAllEpinsDashboard, setIsCancelActivate,
    setIsUserActive

} = ActivationSlice.actions

export default ActivationSlice.reducer
