import { createSlice } from '@reduxjs/toolkit';

/*
THIS IS USED FOR USERS SIDEBAR
*/

const initialState = {
  sidebarOpen: true, // will be set to false on small screen. See users/Sidebar.js
  dropdownOpen: 0, // 0 means no selected
  itemSelected: 0,
  showLogin : true
};

export const sidebarSlice = createSlice({
  name: 'sidebar', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setSidebarOpen: (state, action) => {
        state.sidebarOpen = action.payload
    },
    setDropdownOpen: (state, action) => {
        state.dropdownOpen = action.payload
    },
    setItemSelected: (state, action) => {
        state.itemSelected = action.payload
    },
    setShowLogin: (state, action) => {
      state.showLogin = action.payload
  },
  
  }

});

// export all action above here 
export const { setSidebarOpen, setDropdownOpen, setItemSelected, setShowLogin } = sidebarSlice.actions;

export default sidebarSlice.reducer;
