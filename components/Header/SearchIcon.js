import React from 'react'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import { FiSearch, FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const SearchIcon = ({ style, onClick }) => {
  const { pathname, query } = useRouter()
  if (pathname === '/create-listing') {
    const step = get(query, 'step', 0)
    const button = document.getElementById(`create-listing-button-${step}`)
    const onClick = () => {
      if (button && button.click) button.click()
    }
    switch (toNumber(step)) {
      case 1:
      case 2:
      default:
        return <FiArrowRight style={style} onClick={onClick} />
      case 3:
        return <FiCheckCircle style={style} onClick={onClick} />
    }
  }
  return <FiSearch style={style} onClick={onClick} />
}

export default React.memo(SearchIcon)
