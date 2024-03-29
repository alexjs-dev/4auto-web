import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
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
  const [_, __, closeModal, isModalOpen, isModalOpenDebounced] = useModal()
  useOutsideClick({
    ref,
    isOpen: isModalOpen,
    // setOpen: closeModal,
  })
  if (!isModalOpenDebounced && !isModalOpen) return null
  return (
    <aside className={classNames(styles.container, isModalOpen && styles.visible)}>
      <BaseButton onClick={closeModal} className={styles.closeButton}>
        <CloseIcon size={34} />
      </BaseButton>
      <div ref={ref} className={classNames(styles.wrapper)}>
        {children}
      </div>
    </aside>
  )
}

const Modal = () => {
  const modal = useSelector(modalSelector)
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
        <BaseModal>
          <SearchModal />
        </BaseModal>
      )
    default:
      return null
  }
}

export default Modal
