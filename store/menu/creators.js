import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    toggleDrawerMenu: [],
    openModal: ['modalName'],
    closeModal: [],
  },
  {}
)

export default Creators
