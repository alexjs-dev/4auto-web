import React, { useState } from 'react'
import classNames from 'classnames'
/* @ts-ignore */
import ArrowDownIcon from '~public/icons/arrow-down.svg'
import styles from './ItemDropDown.module.scss'

type Props = {
  title: string
  children: any
}

const ItemDropDown: React.FunctionComponent<Props> = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={styles.container}>
      <button className={styles.title} onClick={() => setOpen(!isOpen)}>
        <h6>{title}</h6>
        <ArrowDownIcon
          className={classNames(styles.arrowIcon, isOpen && styles.active)}
        />
      </button>
      <div className={classNames(styles.content, isOpen && styles.visible)}>
        {children}
      </div>
    </div>
  )
}

export default ItemDropDown
