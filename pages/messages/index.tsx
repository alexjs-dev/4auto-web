import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatsCreators from '../../store/chats/creators'
import { Layout } from '../../components'
import withAuth from '../../hocs/withAuth'
import SearchBar from './components/SearchBar'
import ChatList from './components/ChatList'
import styles from './listing.module.scss'

type Props = {}

/* @ts-ignore */
const ChatsPage: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const fetch = (resetPagination = false) => {
    dispatch(
      ChatsCreators.fetchChats({
        resetPagination,
      })
    )
  }
  useEffect(() => {
    fetch(true)
  }, [])
  return (
    <>
      <Layout className={styles.container}>
        <SearchBar />
      </Layout>
      <ChatList onPaginate={() => fetch(false)} />
    </>
  )
}
export default withAuth(ChatsPage)
