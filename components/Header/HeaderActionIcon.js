import React from 'react'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import { FiSearch, FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const SearchIcon = ({ style, onClick }) => {
  const { pathname, query } = useRouter()
  const isListingCreationPage = pathname.includes('create-listing')
  const step = get(query, 'step', 0)

  if (isListingCreationPage) {
    const CustomOnClick = () => {
      const element = document.getElementById(`create-listing-button-${step}`)
      if (element && element.click) element.click()
    }
    switch (toNumber(step)) {
      case 1:
      case 2:
      default:
        return <FiArrowRight style={style} onClick={CustomOnClick} />
      case 3:
        return <FiCheckCircle style={style} onClick={CustomOnClick} />
    }
  }
  return <FiSearch style={style} onClick={onClick} />
}

export default React.memo(SearchIcon)
