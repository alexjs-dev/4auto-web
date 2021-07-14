import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import styles from './Social.module.scss'
import { BaseButton } from '../'

type Props = {
  title: string
  href: string
}

const FacebookButton: React.FunctionComponent<Props> = ({ title, href }) => {
  return (
    /* @ts-ignore */
    <BaseButton className={styles.facebookButton} isInternalLink href={href}>
      <FaFacebookF fontSize={24} color="white" />
      <span>{title}</span>
    </BaseButton>
  )
}

export default FacebookButton
