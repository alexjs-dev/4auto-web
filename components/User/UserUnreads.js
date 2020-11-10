import React from 'react'
import { FiMail as MailIcon } from 'react-icons/fi'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { BaseButton } from '~components'
import styles from './UserUnreads.module.scss'

const UserUnreads = ({ className }) => {
  const style = { '--unread-messages': `"${55}"` }
  return (
    <BaseButton
      className={classNames(styles.container, className)}
      href="/messages"
      isInternalLink
      style={style}
    >
      <div className={styles.wrapper} style={style}>
        <MailIcon style={{ fontSize: 36 }} />
      </div>
    </BaseButton>
  )
}

UserUnreads.propTypes = {
  className: PropTypes.string,
}

UserUnreads.defaultProps = {
  className: null,
}

export default UserUnreads
