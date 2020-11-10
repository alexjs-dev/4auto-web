import React, { useRef } from 'react'
import classNames from 'classnames'
import NavigationContent from './NavigationContent'
import useOutsideClick from '~hooks/useOutsideClick'
import styles from './NavigationDropdown.module.scss'

const NavigationDropdown = ({ className, children, open, setOpen }) => {
  const ref = useRef(null)
  useOutsideClick({ ref, isOpen: open, setOpen })

  return (
    <div className={classNames(styles.container, className)} ref={ref}>
      {children}
      {open && (
        <div className={styles.drawer}>
          <NavigationContent logoutCallback={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}

export default NavigationDropdown
