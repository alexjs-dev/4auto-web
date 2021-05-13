import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import get from 'lodash/get'
import { getFormValues } from 'redux-form'
import { useSelector } from 'react-redux'
import styles from './ChatView.module.scss'
import { FiPocket } from 'react-icons/fi'
import { TiArrowBack } from 'react-icons/ti'
import { BaseButton } from '../../../components'
import ChatAvatar from './ChatAvatar'
import ChatInput from './ChatInput'
import MessagesList from './MessagesList'

const inputForm = 'messageInputForm'

type Props = {}

const chat = {
  _id: '60965eb333d0e6001756489b',
  listingId: '60965a099597c2049134c1f2',
  lastMessage: {
    _id: '60965eb333d0e6001756489b',
    userId: '60965eb333d0e6001756489b',
    message: 'I remember everything mate. See you later 🤘',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
  },
  messages: [
    {
      _id: Math.random(),
      userId: '60965eb333d0e6001756489b',
      message: Math.random().toString(),
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    {
      _id: Math.random(),
      userId: '60965eb333d0e6001756489b',
      message: 'I remember everything mate. See you later 🤘',
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
    },
  ],
  userId: 'abc',
  unreadMessageCount: 2,
  topic: '220TGU BMW 320 xDrive',
  createdAt: '2021-05-08T09:49:39.230Z',
  updatedAt: '2021-05-08T09:49:39.268Z',
  user: {
    _id: '60965eb333d0e6001756489a',
    role: 0,
    disabledUntil: null,
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    profileId: '60965eb333d0e6001756489a',
    profile: {
      _id: '60965eb333d0e6001756489a',
      firstName: 'Aleksei',
      lastName: 'Dmitrijev',
      isVerified: false,
      personalId: '',
      description: '',
      birthDate: null,
      onlineAt: '2021-05-08T09:31:16.900Z',
      username: 'aleksei',
      createdAt: '2021-05-08T09:49:39.189Z',
      updatedAt: '2021-05-08T09:49:39.189Z',
      image: {
        imageId: '60965eb333d0e6001756489a',
        url:
          'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
        _id: '60965eb333d0e6001756489a',
      },
    },
  },
  participant: {
    _id: '60965eb333d0e6001756489b',
    role: 0,
    disabledUntil: null,
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    profileId: '60965eb333d0e6001756489b',
    profile: {
      _id: '60965eb333d0e6001756489b',
      firstName: 'Jane',
      lastName: 'Qwerty',
      isVerified: false,
      personalId: '',
      description: '',
      birthDate: null,
      onlineAt: '2021-05-08T09:31:16.900Z',
      username: 'janne',
      createdAt: '2021-05-08T09:49:39.189Z',
      updatedAt: '2021-05-08T09:49:39.189Z',
      image: {
        imageId: '60965eb333d0e6001756489b',
        url:
          'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
        _id: '60965eb333d0e6001756489b',
      },
    },
  },
}

const ChatView: React.FunctionComponent<Props> = () => {
  const username = chat.user.profile.username
  const router = useRouter()

  const baseFormValues = useSelector(getFormValues('messageInputForm'))
  const message = get(baseFormValues, 'message', '')
  const textRowsCount = message.length && message.split('\n').length
  const rows = textRowsCount && textRowsCount > 2 ? 2 : textRowsCount || 1

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
            userId={chat.lastMessage.userId.toString()}
            username={username}
            avatarSrc={chat.user.profile.image.url}
            topic={chat.topic}
            listingId={chat.listingId}
          />
        </div>
        <div>
          {/* @ts-ignore */}
          <BaseButton>
            <FiPocket fontSize={22} />
          </BaseButton>
        </div>
      </div>
      <div className={styles.messages}>
        <MessagesList
          messages={[
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random, isAuthor: true },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random, isAuthor: true },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random, isAuthor: true },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random, isAuthor: true },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random, isAuthor: true },
            { _id: Math.random, isAuthor: true },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
            { _id: Math.random },
          ]}
        />
      </div>
      <div className={styles.input}>
        <ChatInput />
      </div>
    </div>
  )
}

export default ChatView
