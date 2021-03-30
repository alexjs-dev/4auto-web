import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FiPlusCircle as AddIcon, FiMenu } from 'react-icons/fi'
import useModal from '~hooks/useModal'
import Creators from '~store/menu/creators'
import { isLoggedInSelector } from '~store/auth/selectors'
import { UserAvatar, UserUnreads, BaseButton } from '~components'
import LogoMiniIcon from '~public/logo-mini.svg'
import SearchIcon from './SearchIcon'
import styles from './MobileHeader.module.scss'

const MobileHeader = () => {
  const { t } = useTranslation()
  const loggedIn = useSelector(isLoggedInSelector)
  const dispatch = useDispatch()
  const [modalTypes, openModal] = useModal()
  const toggleDrawerMenu = () => dispatch(Creators.toggleDrawerMenu())

  const LogoSection = () => {
    const Content = [
      <BaseButton href="/" isInternalLink key="logo">
        <LogoMiniIcon />
      </BaseButton>,
    ]
    if (loggedIn) {
      Content.push(
        <BaseButton
          key="create"
          href="/create-listing?step=1"
          isInternalLink
          className={styles.spacing}
        >
          <AddIcon style={{ fontSize: 40 }} className={styles.icon} />
        </BaseButton>
      )
    }
    return <section className={styles.main}>{Content}</section>
  }

  const ActionSection = () => {
    if (loggedIn) {
      return (
        <section>
          <UserUnreads className={styles.spacing} />
          <BaseButton onClick={() => toggleDrawerMenu()}>
            <UserAvatar />
          </BaseButton>
        </section>
      )
    }
    return (
      <section>
        <BaseButton onClick={() => toggleDrawerMenu()}>
          <FiMenu style={{ fontSize: 36 }} className={styles.icon} />
        </BaseButton>
      </section>
    )
  }

  const SearchSection = () => (
    <div className={styles.baseSearchWrapper}>
      <BaseButton
        className={styles.baseSearch}
        onClick={() => openModal(modalTypes.SEARCH_MODAL)}
      >
        <div className={styles.searchIcon}>
          <SearchIcon
            style={{ fontSize: 36 }}
            onClick={() => openModal(modalTypes.SEARCH_MODAL)}
          />
        </div>
      </BaseButton>
    </div>
  )

  return (
    <header className={styles.container}>
      <LogoSection />
      <SearchSection />
      <ActionSection />
    </header>
  )
}

export default React.memo(MobileHeader)
