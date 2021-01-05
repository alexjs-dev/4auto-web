import { useDispatch, useSelector } from 'react-redux'
import ModalCreators from '~store/menu/creators'
import { modalSelector } from '~store/menu/selectors'
import modalTypes from '~consts/modals'

const useModal = () => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(modalSelector)
  const openModal = (type) => dispatch(ModalCreators.openModal(type))
  const closeModal = () => dispatch(ModalCreators.closeModal())

  return [modalTypes, openModal, closeModal, isModalOpen]
}

export default useModal
