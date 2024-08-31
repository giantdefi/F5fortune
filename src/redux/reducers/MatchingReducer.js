import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    myMatchingBonusArray : false,
    totalMatchingBonus : false,
    totalTx : false

};

export const RefLinkSlice = createSlice({
    name: 'refs', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
     
        setMyMatchingBonusArray: (state, action) => {
            state.myMatchingBonusArray = action.payload
        },
        setTotalMatchingBonus: (state, action) => {
            state.totalMatchingBonus = action.payload
        },
        setTotalTx: (state, action) => {
            state.totalTx = action.payload
        },
        resetRefLink: () => initialState
    }

});

export const { resetRefLink, setMyMatchingBonusArray, setTotalMatchingBonus, setTotalTx} = RefLinkSlice.actions;

export default RefLinkSlice.reducer;
