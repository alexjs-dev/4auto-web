import React, { useState } from 'react'
import classNames from 'classnames'
import useDebounce from '~hooks/useDebounce'
import BaseButton from '../../../components/Button/BaseButton'
import { Loader } from '../../../components'
import { FiSearch, FiPocket } from 'react-icons/fi'
import { FcFullTrash } from 'react-icons/fc'
import styles from './SearchBar.module.scss'

type Props = {}

const SearchBar: React.FunctionComponent<Props> = () => {
  const [text, setText] = useState('')
  const [isInputFocus, setInputFocus] = useState(false)
  const [isFilterActive, setFilterActive] = useState(false)
  const isDeleteVisible = text && !!text.trim()
  const [loading, setLoading] = useState(false)
  const loadingDebounced = useDebounce(loading, 500, () => setLoading(false))
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <FiSearch
          fontSize={22}
          className={classNames(
            styles.searchIcon,
            isInputFocus && styles.searchIconActive
          )}
        />
        <input
          placeholder="Enter for search..."
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setLoading(true)
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />

        {loadingDebounced && (
          <div className={styles.loader}>
            <Loader loading />
          </div>
        )}

        {!loadingDebounced && (
          /* @ts-ignore */
          <BaseButton
            onClick={() => setText('')}
            className={classNames(
              styles.closeButton,
              isDeleteVisible && styles.closeButtonVisible
            )}
          >
            <FcFullTrash fontSize={19} />
          </BaseButton>
        )}
      </div>
      {/* @ts-ignore */}
      <BaseButton
        className={classNames(
          styles.favorites,
          isFilterActive && styles.isFilterActive
        )}
        onClick={() => setFilterActive(!isFilterActive)}
      >
        <span>147</span>
        <FiPocket fontSize={22} />
      </BaseButton>
    </div>
  )
}

export default SearchBar
