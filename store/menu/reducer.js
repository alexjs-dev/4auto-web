import { createReducer } from 'reduxsauce'
import { Types } from './creators'

const INITIAL_STATE = {
  drawerOpen: false,
  modalProps: null,
  props: {},
}

const toggleDrawerMenu = (state) => ({
  ...state,
  drawerOpen: !state.drawerOpen,
})

const openModal = (state, { modalName, props }) => ({
  ...state,
  modal: modalName,
  modalProps: props,
})

const closeModal = (state) => ({
  ...state,
  modal: null,
  modalProps: {},
})

export default createReducer(INITIAL_STATE, {
  [Types.TOGGLE_DRAWER_MENU]: toggleDrawerMenu,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.OPEN_MODAL]: openModal,
})
