import React from 'react'
import map from 'lodash/map'
import find from 'lodash/find'
import get from 'lodash/get'
import { FiCornerDownRight } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../../store/auth/selectors'
import {
  chatsSelector,
  chatsLoadingSelector,
  chatStatsSelector,
} from '../../../store/chats/selectors'
import { BaseButton, Loader } from '../../../components'
import { getUsername } from '../../../utils/helpers'
import styles from './ChatList.module.scss'
import ChatAvatar from './ChatAvatar'

type Props = {}

const getUnreadCountByChatId = (chatStats: any, chatId: string) =>
  get(chatStats, `unreads.${chatId}`, 0)

const ChatList: React.FunctionComponent<Props> = () => {
  const currentUser = useSelector(currentUserSelector)
  const chats = useSelector(chatsSelector)
  const loading = useSelector(chatsLoadingSelector)
  const chatStats = useSelector(chatStatsSelector)
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
                />
                <section className={styles.messageSection}>
                  {get(chat, 'lastMessage.userId') === currentUser._id && (
                    <FiCornerDownRight />
                  )}
                  <span>{get(chat, 'lastMessage.text', '')}</span>
                </section>
                {unreads > 0 && (
                  <span className={styles.unreadsBubble}>{unreads}</span>
                )}
              </BaseButton>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChatList
