import { useDispatch } from 'react-redux'
import ModalCreators from '~store/menu/creators'
import modalTypes from '~consts/modals'

const useModal = () => {
  const dispatch = useDispatch()
  const openModal = (type) => dispatch(ModalCreators.openModal(type))
  const closeModal = () => dispatch(ModalCreators.closeModal())

  return [modalTypes, openModal, closeModal]
}

export default useModal
