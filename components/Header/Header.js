import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { includes } from 'lodash'
import useUser from '~hooks/useUser'
import isEmpty from 'lodash/isEmpty'
import useViewport from '~hooks/useViewport'
import { chatStatsSelector } from '../../store/chats/selectors'
import ChatCreators from '../../store/chats/creators'
import BasicHeader from './BasicHeader'
import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'
import useFetchSelf from '../../hooks/useFetchSelf'

const authPaths = ['/sign-up', '/sign-in', '/forgot-password']
const Header = () => {
  const { pathname } = useRouter()
  const [mobile, setMobile] = useState(false)
  const { isMobile } = useViewport()
  const chatStats = useSelector(chatStatsSelector)

  console.log('chatStats', chatStats)
  const dispatch = useDispatch()
  const { isLoggedIn } = useUser()
  useFetchSelf()
  useEffect(() => {
    setMobile(isMobile)
  }, [isMobile])

  useEffect(() => {
    if (isEmpty(chatStats) && isLoggedIn) {
      dispatch(ChatCreators.fetchChatStats())
    }
  }, [chatStats, isLoggedIn])

  if (includes(authPaths, pathname)) {
    return <BasicHeader />
  }
  if (mobile) return <MobileHeader />
  return <DesktopHeader />
}

export default React.memo(Header)
