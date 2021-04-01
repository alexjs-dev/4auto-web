import React, { useState, useRef, useEffect } from 'react'
import { Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import filter from 'lodash/filter'
import some from 'lodash/some'
import PlacesAutocomplete from 'react-places-autocomplete'
import Creators from '../../store/locations/creators'
import { locationsSelector } from '../../store/locations/selectors'
import BaseInput from './BaseInput'
import useDebounce from '../../hooks/useDebounce'
import BaseButton from '../Button/BaseButton'
import classNames from 'classnames'

import styles from './LocationInput.module.scss'
import InputLabel from './parts/InputLabel'

type Input = {
  name: string
  onBlur: (event: any) => void
  onChange: (event: any) => void
  onDragStart: (event: any) => void
  onDrop: (event: any) => void
  onFocus: (event: any) => void
  value: any
}

type Props = {
  label?: string
  name: string
  isRequired?: boolean
  input: Input
  meta: any
}

const BaseLocationInput: React.FunctionComponent<Props> = ({ input, meta, isRequired, label, name }) => {
  const dispatch = useDispatch()

  const locations = useSelector(locationsSelector)

  console.log('meta', meta)

  const [inputText, setInputText] = useState('')

  const debouncedActive = useDebounce(meta.active, 500);

  const filteredLocations = filter(locations, (location) => {
    const city = location.city.toLowerCase()
    const country = location.country.toLowerCase()
    const words = inputText.split(' ')
    return some(
      words,
      (word) =>
        city.includes(word.toLowerCase()) ||
        country.includes(word.toLowerCase())
    )
  })

  console.log('filteredLocations', filteredLocations)

  useEffect(() => {
    if (dispatch) {
      dispatch(Creators.fetchLocations())
    }
  }, [dispatch])
  return (
    <div className={styles.container}>
      <InputLabel
        isRequired={isRequired}
        label={label}
        active={debouncedActive}
        name={name}
      />
      <BaseInput
        onChange={setInputText}
        onBlur={input.onBlur}
        value={inputText}
        onFocus={input.onFocus}
      />
      {debouncedActive && !!inputText.trim() && (
        <div className={styles.locationsList}>
          {map(filteredLocations, (location) => (
            <BaseButton
              key={location._id}
              onClick={() => {
                setInputText(`${location.city} ${location.country} `)
                input.onChange(location._id)
              }}
            >{`${location.city}, ${location.country}`}</BaseButton>
          ))}
        </div>
      )}
    </div>
  )
}

const GoogleInput: React.FunctionComponent<Props> = () => {
  const searchOptions = {
    types: ['(cities)'],
  }
  const [address, setAddress] = useState('')
  const onSelect = (address: any) => console.log('onSelect', address)
  return (
    <div className={styles.container}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={onSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

type ComponentProps = {
  label?: string
  name: string
  isRequired?: boolean
}

const Component: React.FunctionComponent<ComponentProps> = ({
  name,
  label,
  isRequired,
}) => {
  if (!name) return null
  return (
    <Field
      name={name}
      component={BaseLocationInput}
      props={{ label, name, isRequired }}
    />
  )
}

export default Component
