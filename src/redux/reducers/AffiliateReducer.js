import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    countMyDownline: false,
    myDownlinesArray: false,
    myDownlineLevel: false,
    getUsername: false, // look up users diret ref numbers
    previousUser: false, // back up 1 level or previous user search
    myDirestReferrals: false,

};

export const AffiliateSlice = createSlice({
    name: 'affiliate', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setCountMyDownlines: (state, action) => {
            state.countMyDownline = action.payload
        },
        setMyDownlinesArray: (state, action) => {
            state.myDownlinesArray = action.payload
        },

        setMyDownlineLevel: (state, action) => {
            state.myDownlineLevel = action.payload
        },
        setGetUsername: (state, action) => {
            state.getUsername = action.payload
        },
        setPreviousUser: (state, action) => {
            state.previousUser = action.payload
        },
        setMyDirestReferrals: (state, action) => {
            state.myDirestReferrals = action.payload
        },
        resetAffiliate: () => initialState

    }

});

export const {
    resetAffiliate, setCountMyDownlines, setMyDownlinesArray, setMyDownlineLevel, setMyUpline, setGetUsername, setPreviousUser, setMyDirestReferrals

} = AffiliateSlice.actions;

export default AffiliateSlice.reducer;
