import React from 'react'
import { useRouter } from 'next/router'
import styles from './search.module.scss'

const SearchPage = () => {
  const { query } = useRouter()
  return <div className={styles.container}>{JSON.stringify(query)}</div>
}

export default SearchPage
