import React from 'react'
import map from 'lodash/map'
import get from 'lodash/get'
import { FiCornerDownRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../../store/auth/selectors'
import {
  chatsSelector,
  chatsLoadingSelector,
  chatStatsSelector,
} from '../../../store/chats/selectors'
import { BaseButton, Loader, Button } from '../../../components'
import { getUsername } from '../../../utils/helpers'
import styles from './ChatList.module.scss'
import ChatAvatar from './ChatAvatar'
import { getMessage } from '../../../utils/chatUtils'

type Props = {
  onPaginate: () => void
}

const getUnreadCountByChatId = (chatStats: any, chatId: string) =>
  get(chatStats, `unreads.${chatId}`, 0)

const ChatList: React.FunctionComponent<Props> = ({ onPaginate }) => {
  const currentUser = useSelector(currentUserSelector)
  const chats = useSelector(chatsSelector)
  const loading = useSelector(chatsLoadingSelector)
  const chatStats = useSelector(chatStatsSelector)
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loader}>
          <Loader loading isBranded />
        </div>
      )}
      <ul>
        {map(chats, (chat, index) => {
          const otherChatPerson =
            currentUser._id === chat.author._id ? chat.recipient : chat.author
          const username = getUsername(otherChatPerson)
          const unreads = getUnreadCountByChatId(chatStats, chat._id)
          return (
            /* @ts-ignore */
            <li key={chat._id} tabIndex={index ? index + 1 : 1}>
              {/* @ts-ignore */}
              <BaseButton href={`/messages/${chat._id}`} isInternalLink>
                <ChatAvatar
                  userId={otherChatPerson._id}
                  username={username}
                  avatarSrc={otherChatPerson.profile.image.url}
                  topic={chat.topic}
                  listingId={chat.listingId}
                  updatedAt={chat.updatedAt}
                  wrapTopic
                  hideLinks
                />
                <section className={styles.messageSection}>
                  {get(chat, 'lastMessage.userId') === currentUser._id && (
                    <FiCornerDownRight />
                  )}
                  <span>
                    {get(chat, 'lastMessage') && getMessage(chat.lastMessage)}
                  </span>
                </section>
                {unreads > 0 && (
                  <span className={styles.unreadsBubble}>{unreads}</span>
                )}
              </BaseButton>
            </li>
          )
        })}
      </ul>
      <Button
        label={t('button.loadMore')}
        fluid
        type={Button.types.GHOST}
        onClick={onPaginate}
        className={styles.buttonPaginate}
        loading={loading}
      />
    </div>
  )
}

export default ChatList
