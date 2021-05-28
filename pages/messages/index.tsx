import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatsCreators from '../../store/chats/creators'
import { Layout } from '../../components'
import SearchBar from './components/SearchBar'
import ChatList from './components/ChatList'
import styles from './listing.module.scss'

type Props = {}

const ChatsPage: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ChatsCreators.fetchChats())
  }, [])
  return (
    <>
      <Layout className={styles.container}>
        <SearchBar />
      </Layout>
      <ChatList />
    </>
  )
}

export default ChatsPage
