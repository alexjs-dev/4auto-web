import React from 'react'
import PropTypes from 'prop-types'
import { BaseButton } from '~components'
import styles from './Avatar.module.scss'

const Avatar = ({ title, src, username, profileUrl }) => {
  return (
    <div className={styles.container}>
      {title && <p>{title}</p>}
      <div className={styles.user}>
        <img src={src} alt={username} />
        <BaseButton label={username} href={profileUrl} className={styles.link}>
          {username}
        </BaseButton>
      </div>
    </div>
  )
}

Avatar.PropTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  username: PropTypes.string,
  profileUrl: PropTypes.string,
}

Avatar.defaultProps = {
  title: 'SELLER',
  src:
    'https://static01.nyt.com/images/2019/05/18/arts/johnwick-anatomy/johnwick-anatomy-videoSixteenByNineJumbo1600-v2.jpg',
  username: 'John Wick',
  profileUrl: 'https://www.google.com',
}

export default Avatar
