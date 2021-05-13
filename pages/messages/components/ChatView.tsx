import React from 'react'
import { useRouter } from 'next/router'
import styles from './ChatView.module.scss'
import { TiArrowBack } from 'react-icons/ti'
import { BaseButton } from '../../../components'
import ChatAvatar from './ChatAvatar'

type Props = {}

const chat = {
  _id: '60965eb333d0e6001756489b',
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChatAvatar
          userId={chat.lastMessage.userId.toString()}
          username={username}
          avatarSrc={chat.user.profile.image.url}
          topic={chat.topic}
        />
        {/* @ts-ignore */}
        <BaseButton className={styles.backButton} onClick={() => router.back()}>
          <TiArrowBack fontSize={28} />
        </BaseButton>
      </div>
    </div>
  )
}

export default ChatView
