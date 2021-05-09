import React from 'react'
import map from 'lodash/map'
import { FiCornerDownRight } from 'react-icons/fi'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../../store/auth/selectors'
import { Avatar, BaseButton } from '../../../components'
import styles from './ChatList.module.scss'

type Props = {}

const chats = [
  {
    _id: '60965eb333d0e6001756489b',
    lastMessage: {
      _id: '60965eb333d0e6001756489b',
      userId: '60965eb333d0e6001756489b',
      message: 'I remember everything mate. See you later 🤘',
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
    },
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
  },

  {
    _id: '60965eb333d0e6001756489a',
    lastMessage: {
      _id: '60965eb333d0e6001756489a',
      userId: '60965eb333d0e6001756489a',
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
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
    user: {
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
  },

  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
  {
    _id: Math.random(),
    lastMessage: {
      _id: Math.random(),
      userId: Math.random(),
      message:
        'Omg! Please reply to me, I really want this by the end of today! Its urgent!!!',
      createdAt: '2021-04-08T09:49:39.230Z',
      updatedAt: '2021-04-08T09:49:39.268Z',
    },
    userId: 'abc',
    unreadMessageCount: 2,
    topic: '510GMA Mercedes-Benz E220',
    createdAt: '2021-05-08T09:49:39.230Z',
    updatedAt: '2021-05-08T09:49:39.268Z',
    participant: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person3_wkfsip.jpg',
          _id: Math.random(),
        },
      },
    },
    user: {
      _id: Math.random(),
      role: 0,
      disabledUntil: null,
      createdAt: '2021-05-08T09:49:39.230Z',
      updatedAt: '2021-05-08T09:49:39.268Z',
      profileId: Math.random(),
      profile: {
        _id: Math.random(),
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
          imageId: Math.random(),
          url:
            'https://res.cloudinary.com/forautocloud/image/upload/v1614197192/static/person2_zxvfou.jpg',
          _id: Math.random(),
        },
      },
    },
  },
]

const ChatList: React.FunctionComponent<Props> = () => {
  const currentUser = useSelector(currentUserSelector)
  return (
    <div className={styles.container}>
      <ul>
        {map(chats, (chat, index) => {
          const username = chat.user.profile.username
          return (
            <li key={chat._id} tabIndex={index + 1}>
              {/* @ts-ignore */}
              <BaseButton href={`/messages/${chat._id}`} isInternalLink>
                <section className={styles.generalSection}>
                  <Avatar
                    userId={chat.lastMessage.userId.toString()}
                    username={username}
                    avatarSrc={chat.user.profile.image.url}
                    hideUsername
                  />
                  <div className={styles.title}>
                    <h6>{username}</h6>
                    <span>{chat.topic}</span>
                  </div>
                  <span className={styles.chatUpdatedTitle}>
                    {moment(chat.updatedAt).fromNow()}
                  </span>
                </section>
                <section className={styles.messageSection}>
                  {chat.lastMessage.userId === currentUser._id && (
                    <FiCornerDownRight />
                  )}
                  <span>{chat.lastMessage.message}</span>
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
