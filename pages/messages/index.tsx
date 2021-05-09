import React from 'react'
import { Layout } from '../../components'
import SearchBar from './components/SearchBar'
import ChatList from './components/ChatList'
import styles from './listing.module.scss'

type Props = {}

const ChatsPage: React.FunctionComponent<Props> = () => {
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
