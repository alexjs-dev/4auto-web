import React, { useState } from 'react'
import BaseScreen from './screens/BaseScreen'
import ChatScreen from './screens/ChatScreen'
import OfferScreen from './screens/OfferScreen'
import BaseAdminScreen from './screens/BaseAdminScreen'

const screens = {
  BASE: 'BASE',
  CHAT: 'CHAT',
  OFFER: 'OFFER',
}

type Props = {
  price?: number
  title: string
  listingId: string
  isAdmin?: boolean
}

const VehicleCardScreen: React.FunctionComponent<Props> = ({
  price,
  title,
  listingId,
  isAdmin,
}) => {
  const [screen, setScreen] = useState(screens.BASE)

  const onChatCancel = () => {
    setScreen(screens.BASE)
  }

  if (isAdmin) {
    return (
      <>
        <BaseAdminScreen listingId={listingId} visible={screen === screens.BASE} />
      </>
    )
  }
  return (
    <>
      <ChatScreen
        /* @ts-ignore */
        onChatCancel={onChatCancel}
        visible={screen === screens.CHAT}
      />
      <OfferScreen
        onCancel={() => setScreen(screens.BASE)}
        visible={screen === screens.OFFER}
        price={price}
        title={title}
        listingId={listingId}
      />
      <BaseScreen
        onOfferScreenOpen={() => setScreen(screens.OFFER)}
        onChatScreenOpen={() => setScreen(screens.CHAT)}
        visible={screen === screens.BASE}
      />
    </>
  )
}

export default VehicleCardScreen
