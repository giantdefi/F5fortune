import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  marketingPlanSelected: false,
  setting_level_1_username: false, // when activate binary and back to m-tree

  newActivated_username: false,

  isFlashOut: false,

  showWalletCopyLink: true, // option for mobile and desktop. Not working on mobile so we set false.
  allowSound : false,
}

export const SettingSlice = createSlice({
  name: 'setting', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setMarketingPlanSelected: (state, action) => {
      state.marketingPlanSelected = action.payload
    },
    setSetting_level_1_username: (state, action) => {
      state.setting_level_1_username = action.payload
    },
    setNewActivated_username: (state, action) => {
      state.newActivated_username = action.payload
    },
    setIsFlashOut: (state, action) => {
      state.isFlashOut = action.payload
    },
    setWalletCopyLink: (state, action) => {
      state.showWalletCopyLink = action.payload
    },
    setAllowSound: (state, action) => {
      state.allowSound = action.payload
    },

    resetSetting: () => initialState
  }

})

export const { resetSetting, setAllowSound, setIsFlashOut,
  setMarketingPlanSelected,
  setSetting_level_1_username, setWalletCopyLink,
  setNewActivated_username } = SettingSlice.actions

export default SettingSlice.reducer
