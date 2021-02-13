import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Creators from '~store/menu/creators'
import { BaseButton } from '~components'
import { FiX as CloseIcon } from 'react-icons/fi'
import { modalSelector } from '~store/menu/selectors'
import useOutsideClick from '~hooks/useOutsideClick'
import useModal from '~hooks/useModal'
import styles from './BaseModal.module.scss'
import ImageListModal from './ImageListModal'
import OfferModal from './OfferModal'
import SearchModal from './SearchModal'
import types from '~consts/modals'

const BaseModal = ({ children, isOutsideClickDisabled }) => {
  const ref = useRef(null)
  const [_, __, closeModal, isModalOpen] = useModal()
  useOutsideClick({
    ref,
    isOpen: isModalOpen,
    // setOpen: isOutsideClickDisabled ? () => {} : closeModal,
  })
  return (
    <div className={styles.container}>
      <BaseButton onClick={() => closeModal()} className={styles.closeButton}>
        <CloseIcon size={34} />
      </BaseButton>
      <div ref={ref} className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}

const Modal = () => {
  const modal = useSelector(modalSelector)
  console.log('modal', modal)
  switch (modal) {
    case types.IMAGE_LIST_MODAL:
      return (
        <BaseModal>
          <ImageListModal />
        </BaseModal>
      )
    case types.OFFER_MODAL:
      return (
        <BaseModal>
          <OfferModal />
        </BaseModal>
      )
    case types.SEARCH_MODAL:
      return (
        <BaseModal isOutsideClickDisabled>
          <SearchModal />
        </BaseModal>
      )
    default:
      return null
  }
}

export default Modal
