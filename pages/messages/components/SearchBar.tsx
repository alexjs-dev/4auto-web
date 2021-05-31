import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import get from 'lodash/get'
import ChatsCreators from '../../../store/chats/creators'
import { chatsLoadingSelector } from '../../../store/chats/selectors'
import useDebounce from '../../../hooks/useDebounce'
import BaseButton from '../../../components/Button/BaseButton'
import { Loader } from '../../../components'
import { FiSearch, FiPocket } from 'react-icons/fi'
import { FcFullTrash } from 'react-icons/fc'
import styles from './SearchBar.module.scss'
import { currentUserSelector } from '~/store/auth/selectors'

type Props = {}

const SearchBar: React.FunctionComponent<Props> = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isInputFocus, setInputFocus] = useState(false)
  const [isFilterActive, setFilterActive] = useState(false)
  const isDeleteVisible = text && !!text.trim()
  const loading = useSelector(chatsLoadingSelector)
  const currentUser = useSelector(currentUserSelector)
  const debouncedText = useDebounce(text, 900)

  const favoriteChatIds = get(currentUser, 'favoriteChatIds', [])

  useEffect(() => {
    if (!loading) {
      dispatch(
        ChatsCreators.fetchChats({
          resetPagination: true,
          // fuzzy-search supported on BE for this field
          ...(debouncedText && debouncedText.trim() !== ''
            ? { topic: debouncedText }
            : {}),
          ...(isFilterActive && favoriteChatIds.length > 0
            ? {
                _id: {
                  $in: favoriteChatIds,
                },
              }
            : {}),
        })
      )
    }
  }, [debouncedText, isFilterActive])

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
          placeholder={t('titles.searchForChatTopic')}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />

        {loading && (
          <div className={styles.loader}>
            <Loader loading />
          </div>
        )}

        {!loading && (
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
        <span>{favoriteChatIds.length}</span>
        <FiPocket fontSize={22} />
      </BaseButton>
    </div>
  )
}

export default SearchBar
