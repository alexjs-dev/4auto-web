import React from 'react'
import { FiMail as MailIcon } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import reduce from 'lodash/reduce'
import { chatStatsSelector } from '../../store/chats/selectors'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { BaseButton } from '~components'
import styles from './UserUnreads.module.scss'

const countUnreads = (stats) => {
  const count = stats
    ? reduce(
        stats.unreads,
        (prev, curr) => {
          if (!curr) return 0
          return prev + curr.unreadCount
        },
        0
      )
    : 0

  return count
}

const UserUnreads = ({ className }) => {
  const chatStats = useSelector(chatStatsSelector)
  const count = countUnreads(chatStats)
  const style = count > 0 ? { '--unread-messages': `"${count}"` } : {}
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
