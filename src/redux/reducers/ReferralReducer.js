import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    // master: 'FX10001', // default
    // refLink: 'FX10001' // default

    masterRef: 'FX10001',
    refLink: 'FX10001',

    myRefBonusArray : false,
    totalRefBonus : false,

};

export const RefLinkSlice = createSlice({
    name: 'refs', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setRefLink: (state, action) => {
            state.refLink = action.payload
        },
        setMyRefBonusArray: (state, action) => {
            state.myRefBonusArray = action.payload
        },
        setTotalRefBonus: (state, action) => {
            state.totalRefBonus = action.payload
        },
        resetRefLink: () => initialState
    }

});

export const { resetRefLink, setRefLink, setMyRefBonusArray, setTotalRefBonus } = RefLinkSlice.actions;

export default RefLinkSlice.reducer;

