import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { includes } from 'lodash'
import useViewport from '~hooks/useViewport'
import BasicHeader from './BasicHeader'
import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'

const authPaths = ['/sign-up', '/sign-in', '/forgot-password']
const Header = () => {
  const { pathname } = useRouter()
  const [mobile, setMobile] = useState(false)
  const { isMobile } = useViewport()
  useEffect(() => {
    setMobile(isMobile)
  }, [isMobile])
  if (includes(authPaths, pathname)) {
    return <BasicHeader />
  }
  if (mobile) return <MobileHeader />
  return <DesktopHeader />
}

export default React.memo(Header)
