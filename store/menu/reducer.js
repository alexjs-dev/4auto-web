import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  drawerOpen: false,
}

const toggleDrawerMenu = state => ({
  ...state,
  drawerOpen: !state.drawerOpen,
})

export default createReducer(INITIAL_STATE, {
  [Types.TOGGLE_DRAWER_MENU]: toggleDrawerMenu,
})
