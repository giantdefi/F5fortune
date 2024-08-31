import { createSlice } from '@reduxjs/toolkit'

const initialState = {

dropdownOpen : false,

}

export const drawerSlice = createSlice({
  name: 'drawer', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setdropdownOpen: (state, action) => {
      state.dropdownOpen = action.payload
    },
   


    reseDrawer: () => initialState
  }

})

export const { reseDrawer, setdropdownOpen
} = drawerSlice.actions

export default drawerSlice.reducer
