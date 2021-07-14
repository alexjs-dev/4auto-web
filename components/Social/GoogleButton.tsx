import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import styles from './Social.module.scss'
import { BaseButton } from '../'

type Props = {
  title: string
  href: string
}

const GoogleButton: React.FunctionComponent<Props> = ({ title, href }) => {
  return (
    /* @ts-ignore */
    <BaseButton className={styles.googleButton} isInternalLink href={href}>
      <FcGoogle fontSize={24} />
      <span>{title}</span>
    </BaseButton>
  )
}

export default GoogleButton
