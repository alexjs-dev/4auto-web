import React from 'react'
import map from 'lodash/map'
import { FiCornerDownRight } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../../store/auth/selectors'
import {
  chatsSelector,
  chatsLoadingSelector,
} from '../../../store/chats/selectors'
import { BaseButton, Loader } from '../../../components'
import { getUsername } from '../../../utils/helpers'
import styles from './ChatList.module.scss'
import ChatAvatar from './ChatAvatar'

type Props = {}

const ChatList: React.FunctionComponent<Props> = () => {
  const currentUser = useSelector(currentUserSelector)
  const chats = useSelector(chatsSelector)
  const loading = useSelector(chatsLoadingSelector)
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
                  {chat.lastMessage.userId === currentUser._id && (
                    <FiCornerDownRight />
                  )}
                  <span>{chat.lastMessage.text}</span>
                </section>
              </BaseButton>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChatList
