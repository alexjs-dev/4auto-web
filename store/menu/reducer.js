import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  drawerOpen: false,
  modal: null,
}

const toggleDrawerMenu = (state) => ({
  ...state,
  drawerOpen: !state.drawerOpen,
})

const openModal = (state, { modalName }) => ({
  ...state,
  modal: modalName,
})

const closeModal = (state) => ({
  ...state,
  modal: null,
})

export default createReducer(INITIAL_STATE, {
  [Types.TOGGLE_DRAWER_MENU]: toggleDrawerMenu,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.OPEN_MODAL]: openModal,
})
