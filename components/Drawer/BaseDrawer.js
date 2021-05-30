import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import MenuCreators from '~store/menu/creators'
import useDebounce from '~hooks/useDebounce'
import { isDrawerOpenSelector } from '~store/menu/selectors'
import useOutsideClick from '~hooks/useOutsideClick'
import styles from './BaseDrawer.module.scss'

const NavigationDrawer = ({ children, className }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const drawerOpen = useSelector(isDrawerOpenSelector)
  const toggleDrawerMenu = () => {
    if (dispatch) {
      dispatch(MenuCreators.toggleDrawerMenu())
    }
  }
  const drawerOpenDebounced = useDebounce(drawerOpen, 500)
  // useEffect(() => {
  //   if (drawerOpen) {
  //     disableBodyScroll(ref.current)
  //   } else {
  //     enableBodyScroll(ref.current)
  //   }
  //   return () => {
  //     enableBodyScroll(ref.current)
  //     clearAllBodyScrollLocks()
  //   }
  // }, [ref.current, drawerOpen])

  useEffect(() => {
    if (drawerOpenDebounced) {
      clearAllBodyScrollLocks()
    }
  }, [drawerOpenDebounced])

  useOutsideClick({ ref, isOpen: drawerOpen, setOpen: toggleDrawerMenu })
  if (!drawerOpenDebounced && !drawerOpen) return null
  return (
    <aside
      className={classNames(
        styles.container,
        drawerOpen && styles.visible,
        className
      )}
    >
      <div
        ref={ref}
        className={classNames(styles.drawer, drawerOpen && styles.visible)}
      >
        {children}
      </div>
    </aside>
  )
}

NavigationDrawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  className: PropTypes.string,
}

NavigationDrawer.defaultProps = {
  children: null,
  className: null,
}

export default NavigationDrawer
