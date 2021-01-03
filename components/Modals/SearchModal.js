import React from 'react'
import { SearchForm } from '~components'
import useModal from '~hooks/useModal'
import styles from './SearchModal.module.scss'

const SearchModal = () => {
  const [_, __, closeModal] = useModal()
  return (
    <div className={styles.container}>
      <SearchForm />
    </div>
  )
}

export default SearchModal
