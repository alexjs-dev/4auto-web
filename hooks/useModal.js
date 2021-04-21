import { useDispatch, useSelector } from 'react-redux'
import ModalCreators from '~store/menu/creators'
import useDebounce from '~hooks/useDebounce'
import { modalSelector } from '~store/menu/selectors'
import modalTypes from '~consts/modals'

const useModal = () => {
  const dispatch = useDispatch()
  const modal = useSelector(modalSelector)
  const openModal = (type) => dispatch(ModalCreators.openModal(type))
  const closeModal = () => dispatch(ModalCreators.closeModal())
  const isModalOpen = !!modal
  const isModalOpenDebounced = useDebounce(isModalOpen, 500)
  return [modalTypes, openModal, closeModal, isModalOpen, isModalOpenDebounced]
}

export default useModal
