import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import uniq from 'lodash/uniq'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import { getFormValues } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  currentChatSelector,
  currentChatLoader,
} from '../../../store/chats/selectors'
import { messageSelector } from '../../../store/messages/selectors'
import AuthCreators from '../../../store/auth/creators'

import styles from './ChatView.module.scss'
import { FiPocket } from 'react-icons/fi'
import { TiArrowBack } from 'react-icons/ti'
import { BaseButton, Loader } from '../../../components'
import ChatAvatar from './ChatAvatar'
import ChatInput from './ChatInput'
import MessagesList from './MessagesList'
import { getUsername } from '~/utils/helpers'
import { currentUserSelector } from '~/store/auth/selectors'

const inputForm = 'messageInputForm'

type Props = {}

const ChatView: React.FunctionComponent<Props> = () => {
  const chat = useSelector(currentChatSelector)
  const currentUser = useSelector(currentUserSelector)
  const loadingChat = useSelector(currentChatLoader)
  const dispatch = useDispatch()
  const otherChatPerson =
    currentUser._id === get(chat, 'author._id') ? chat.recipient : chat.author
  const username = getUsername(otherChatPerson)
  const router = useRouter()
  const baseFormValues = useSelector(getFormValues(inputForm))
  const message = get(baseFormValues, 'message', '')
  const textRowsCount = message.length && message.split('\n').length
  const rows = textRowsCount && textRowsCount > 2 ? 2 : textRowsCount || 1
  const messages = useSelector(messageSelector)
  const currentMessages = get(messages, chat._id, [])

  const favoriteChatIds = get(currentUser, 'favoriteChatIds', [])

  const isChatFavourited = includes(favoriteChatIds, chat._id)

  if (loadingChat || isEmpty(chat) || !otherChatPerson || !currentUser) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Loader loading isBranded />
      </div>
    )
  }

  const handleUpdateChatFavorites = () => {
    if (!isChatFavourited) {
      dispatch(
        AuthCreators.updateSelf({
          userId: currentUser._id,
          favoriteChatIds: uniq([...favoriteChatIds, chat._id]),
        })
      )
    } else {
      dispatch(
        AuthCreators.updateSelf({
          userId: currentUser._id,
          favoriteChatIds: filter(favoriteChatIds, chat._id),
        })
      )
    }
  }

  return (
    <div
      className={classNames(styles.container, rows > 1 && styles.inputLarge)}
    >
      <div className={styles.header}>
        <div>
          {/* @ts-ignore */}
          <BaseButton
            className={styles.backButton}
            onClick={() => router.back()}
          >
            <TiArrowBack fontSize={28} />
          </BaseButton>
          <ChatAvatar
            userId={otherChatPerson._id}
            username={username}
            avatarSrc={otherChatPerson.profile.image.url}
            topic={chat.topic}
            listingId={chat.listingId}
          />
        </div>
        <div>
          {/* @ts-ignore */}
          <BaseButton
            onClick={handleUpdateChatFavorites}
            className={classNames(isChatFavourited && styles.favoriteActive)}
          >
            <FiPocket fontSize={22} />
          </BaseButton>
        </div>
      </div>

      <MessagesList messages={currentMessages} />
      <div className={styles.input}>
        <ChatInput />
      </div>
    </div>
  )
}

export default ChatView
