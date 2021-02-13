import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    toggleDrawerMenu: [],
    openModal: ['modalName', 'props'],
    closeModal: [],
  },
  {}
)

export default Creators
