import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  FiPlusCircle as AddIcon,
  FiSearch,
  FiMenu,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi'
import classNames from 'classnames'
import useModal from '~hooks/useModal'
import { isLoggedInSelector } from '~store/auth/selectors'
import {
  UserAvatar,
  UserUnreads,
  LanguageSwitch,
  Button,
  BaseButton,
  NavigationDropdown,
  LanguageList,
} from '~components'
import LogoIcon from '~public/logo.svg'
import HeaderActionIcon from './HeaderActionIcon'
import styles from './DesktopHeader.module.scss'

const DesktopHeader = () => {
  const { t } = useTranslation()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [margin, setMargin] = useState(0)
  const [modalTypes, openModal] = useModal()
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      setMargin(ref.current.clientHeight)
    }
  }, [ref.current])

  const LogoSection = () => (
    <section className={styles.main}>
      <BaseButton isInternalLink href="/" className={styles.logo}>
        <LogoIcon />
      </BaseButton>
    </section>
  )
  const searchIconStyle = { fontSize: 48 }
  const SearchSection = () => (
    <BaseButton className={styles.search}>
      <div className={styles.searchIcon}>
        <HeaderActionIcon
          style={searchIconStyle}
          onClick={() => openModal(modalTypes.SEARCH_MODAL)}
        />
      </div>
    </BaseButton>
  )

  const ActionSection = () => {
    if (isLoggedIn) {
      return (
        <section>
          <BaseButton
            className={styles.add}
            isInternalLink
            href="/create-listing?step=1"
          >
            <AddIcon
              className={styles.addListingIcon}
              style={{ fontSize: 40 }}
            />
            <span>{t('button.addListing')}</span>
          </BaseButton>
          <LanguageSwitch />
          <UserUnreads className={styles.spacing} />
          <NavigationDropdown open={drawerOpen} setOpen={setDrawerOpen}>
            <BaseButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={styles.center}
            >
              <UserAvatar />
            </BaseButton>
          </NavigationDropdown>
        </section>
      )
    }
    return (
      <section>
        <Button
          isInternalLink
          href="/sign-up"
          type="text"
          className={styles.actionButton}
        >
          {t('button.signUp')}
        </Button>
        <LanguageSwitch className={styles.spacingLarge} />
        <NavigationDropdown open={drawerOpen} setOpen={setDrawerOpen}>
          <BaseButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={styles.center}
          >
            <FiMenu
              style={{ fontSize: 36 }}
              className={classNames(
                styles.icon,
                drawerOpen && styles.drawerOpenIcon
              )}
            />
          </BaseButton>
        </NavigationDropdown>
      </section>
    )
  }
  return (
    <>
      <header className={styles.container} ref={ref}>
        <LogoSection />
        <SearchSection />
        <ActionSection />
      </header>
      <div className={styles.headerSpacer} style={{ marginBottom: margin }} />
    </>
  )
}

export default DesktopHeader
