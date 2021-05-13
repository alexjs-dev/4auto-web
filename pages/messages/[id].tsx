import React from 'react'
import { Layout } from '../../components'
import ChatView from './components/ChatView'

type Props = {}

const ChatPage: React.FunctionComponent<Props> = () => {
  return (
    <Layout>
      <ChatView />
    </Layout>
  )
}

export default ChatPage
