import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Creators from '~store/menu/creators'
import { BaseButton } from '~components'
import { FiX as CloseIcon } from 'react-icons/fi'
import { modalSelector } from '~store/menu/selectors'
import styles from './BaseModal.module.scss'
import ImageListModal from './ImageListModal'
import types from '~consts/modals'

const BaseModal = ({ children }) => {
  const dispatch = useDispatch()
  return (
    <div className={styles.container}>
      <BaseButton
        onClick={() => dispatch(Creators.closeModal())}
        className={styles.closeButton}
      >
        <CloseIcon size={34} />
      </BaseButton>
      {children}
    </div>
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

    default:
      return null
  }
}

export default Modal
