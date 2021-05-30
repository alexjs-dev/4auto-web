import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../components'
import ChatCreators from '../../store/chats/creators'
import MessagesCreators from '../../store/messages/creators'
import { useDispatch } from 'react-redux'
import ChatView from './components/ChatView'

type Props = {}

const ChatPage: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (id && id !== '') {
      dispatch(ChatCreators.fetchChat(id))
      dispatch(
        MessagesCreators.fetchMessages(id, {
          resetPagination: true,
        })
      )
    }
  }, [id])
  return (
    <Layout>
      <ChatView />
    </Layout>
  )
}

export default ChatPage
