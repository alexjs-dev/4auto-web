import React from 'react'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  FiUser as PersonIcon,
  FiUserPlus as PersonAddIcon,
  FiInfo as InfoIcon,
  FiPlusCircle as AddIcon,
  FiLogOut as LogOutIcon,
  FiHeart as HeartIcon,
  FiList as ListIcon,
} from 'react-icons/fi'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedInSelector } from '~store/auth/selectors'
import Creators from '~store/auth/creators'
import { BaseButton } from '~components'
import styles from './NavigationDropdown.module.scss'

const NavigationContent = ({ logoutCallback, className, fontSize }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const { t } = useTranslation()

  const loggedInOptions = [
    {
      icon: <PersonIcon style={{ fontSize }} />,
      label: 'navigation.myProfile',
      href: '/profile',
    },
    {
      icon: <AddIcon style={{ fontSize }} />,
      label: 'button.addListing',
      href: '/create-listing',
    },
    {
      icon: <HeartIcon style={{ fontSize }} />,
      label: 'navigation.myFavorites',
      href: '/my-favorites',
    },
    {
      icon: <ListIcon style={{ fontSize }} />,
      label: 'navigation.myListings',
      href: '/listings',
    },
    {
      icon: <InfoIcon style={{ fontSize }} />,
      label: 'navigation.legalAndFaq',
      href: '/faq',
    },
    {
      icon: <LogOutIcon style={{ fontSize }} />,
      label: 'button.logOut',
      onClick: () => {
        if (logoutCallback) logoutCallback()
        dispatch(Creators.logOut())
      },
    },
  ]

  const loggedOutOptions = [
    {
      icon: <PersonIcon style={{ fontSize }} />,
      label: 'button.signIn',
      href: '/sign-in',
    },
    {
      icon: <PersonAddIcon style={{ fontSize }} />,
      label: 'button.signUp',
      href: '/sign-up',
    },
    {
      icon: <HeartIcon style={{ fontSize }} />,
      label: 'navigation.myFavorites',
      href: '/my-favorites',
    },
    {
      icon: <InfoIcon style={{ fontSize }} />,
      label: 'navigation.legalAndFaq',
      href: '/faq',
    },
  ]

  return map(isLoggedIn ? loggedInOptions : loggedOutOptions, (option, key) => {
    const { href, onClick, label, icon } = option
    return (
      <BaseButton
        className={classNames(styles.option, className)}
        key={key}
        {...(href ? { href, isInternalLink: true } : {})}
        {...(onClick ? { onClick } : {})}
      >
        {icon}
        <span>{t(label)}</span>
      </BaseButton>
    )
  })
}

NavigationContent.propTypes = {
  fontSize: PropTypes.number,
  className: PropTypes.string,
  logoutCallback: PropTypes.func,
}

NavigationContent.defaultProps = {
  logoutCallback: null,
  className: null,
  fontSize: 24,
}

export default NavigationContent
