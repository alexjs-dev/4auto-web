import React, { useState } from 'react'
import BaseScreen from './screens/BaseScreen'
import ChatScreen from './screens/ChatScreen'

const screens = {
  BASE: 'BASE',
  CHAT: 'CHAT',
}

const VehicleCardScreen = () => {
  const [screen, setScreen] = useState(screens.BASE)

  return (
    <>
      <ChatScreen
        onChatCancel={() => setScreen(screens.BASE)}
        visible={screen === screens.CHAT}
      />

      <BaseScreen
        onChatScreenOpen={() => setScreen(screens.CHAT)}
        visible={screen === screens.BASE}
      />
    </>
  )
}

export default VehicleCardScreen
