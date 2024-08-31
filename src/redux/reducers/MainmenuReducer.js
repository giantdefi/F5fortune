import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  mainMenuItem: false,

  mainSidebarOpen: true,
  dropdownOpen: 0, // 0 means no selected
  itemSelected: 0,
  menuActive: 0,

  userTopMenu: 0,
  mtreeBackURL: false,
  calculatorBackURL: false,

  drawerMenu: false,

  loginSidebar : false,
  leftSidebar : false,
}

export const mainMenuSlice = createSlice({
  name: 'mainmenu', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setMainMenuItem: (state, action) => {
      state.mainMenuItem = action.payload
    },
    setMainSidebarOpen: (state, action) => {
      state.mainSidebarOpen = action.payload
    },
    setDropdownOpen: (state, action) => {
      state.dropdownOpen = action.payload
    },
    setItemSelected: (state, action) => {
      state.itemSelected = action.payload
    },
    setMenuActive: (state, action) => {
      state.menuActive = action.payload
    },
    setUserTopMenu: (state, action) => {
      state.userTopMenu = action.payload
    },
    setMtreeBackURL: (state, action) => {
      state.mtreeBackURL = action.payload
    },
    setMtreeBackURL: (state, action) => {
      state.mtreeBackURL = action.payload
    },
    setCalculatorBackURL: (state, action) => {
      state.calculatorBackURL = action.payload
    },
    setDrawerMenu: (state, action) => {
      state.drawerMenu = action.payload
    },
    setLoginSidebar: (state, action) => {
      state.loginSidebar = action.payload
    },
    setLeftSidebar: (state, action) => {
      state.leftSidebar = action.payload
    },


    resetMainmenu: () => initialState
  }

})

export const { resetMainmenu, setMainMenuItem, setCalculatorBackURL, setMainSidebarOpen, setDropdownOpen, setDrawerMenu, setLoginSidebar,setLeftSidebar,
  setItemSelected, setMenuActive, setUserTopMenu, setMtreeBackURL,
  setWalletHighlight
} = mainMenuSlice.actions

export default mainMenuSlice.reducer
