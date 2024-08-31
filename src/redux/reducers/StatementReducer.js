import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalEquity: false,
    runningDays: false,
    runningProfit: false,
    effectiveDays: false,
    availabletoWDDays : false,
    availabletoWDValue : false

};

export const StatementSlice = createSlice({
    name: 'statement', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setTotalEquity: (state, action) => {
            state.totalEquity = action.payload
        },
        setRunningDays: (state, action) => {
            state.runningDays = action.payload
        },
        setRunningProfit: (state, action) => {
            state.runningProfit = action.payload
        },
        setEffectiveDays: (state, action) => {
            state.effectiveDays = action.payload
        },
        setAvailabletoWDDays: (state, action) => {
            state.availabletoWDDays = action.payload
        },
        setAvailabletoWDValue: (state, action) => {
            state.availabletoWDValue = action.payload
        },
        resetStatement: () => initialState

    }

});

export const { resetStatement, setTotalEquity, setRunningDays, setRunningProfit, setEffectiveDays, setAvailabletoWDDays, setAvailabletoWDValue } = StatementSlice.actions;

export default StatementSlice.reducer;
