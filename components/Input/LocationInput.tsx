import React, { useState, useEffect } from 'react'
import { Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { MdCancel } from 'react-icons/md'
import map from 'lodash/map'
import filter from 'lodash/filter'
import take from 'lodash/take'
import isEmpty from 'lodash/isEmpty'

import some from 'lodash/some'
import PlacesAutocomplete from 'react-places-autocomplete'
import Creators from '../../store/locations/creators'
import {
  locationsSelector,
  locationsLoadingSelector,
} from '../../store/locations/selectors'
import BaseInput from './BaseInput'
import useDebounce from '../../hooks/useDebounce'
import BaseButton from '../Button/BaseButton'
import classNames from 'classnames'

import styles from './LocationInput.module.scss'
import InputLabel from './parts/InputLabel'
import InputErrorText from './parts/InputErrorText'
import Loader from '../Loader/Loader'

type Input = {
  name: string
  onBlur: (event?: any) => void
  onChange: (event: any) => void
  onDragStart: (event: any) => void
  onDrop: (event: any) => void
  onFocus: (event?: any) => void
  value: any
}

type Props = {
  label?: string
  name: string
  isRequired?: boolean
  input: Input
  meta: any
  disabled?: boolean
  loading?: boolean
}

const BaseLocationInput: React.FunctionComponent<Props> = ({
  input,
  meta,
  isRequired,
  label,
  disabled,
  name,
}) => {
  const dispatch = useDispatch()
  const { onBlur, onChange, onFocus } = input
  const { active, error } = meta
  const locations = useSelector(locationsSelector)
  const [inputText, setInputText] = useState('')
  const debouncedActive = useDebounce(active, 500)
  const loading = useSelector(locationsLoadingSelector)
  const filteredLocations = take(
    filter(locations, (location) => {
      const city = location.city.toLowerCase()
      const country = location.country.toLowerCase()
      const words = inputText.split(' ')
      return some(
        words,
        (word) =>
          city.includes(word.toLowerCase()) ||
          country.includes(word.toLowerCase())
      )
    }),
    40
  )

  useEffect(() => {
    if (dispatch) {
      dispatch(Creators.fetchLocations())
    }
  }, [dispatch])

  const reset = () => {
    setInputText('')
    onChange(null)
  }

  return (
    <div className={classNames(styles.container, styles)} id={`field-${name}`}>
      <InputLabel
        isRequired={isRequired}
        label={label}
        active={debouncedActive}
        name={name}
      />
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader centered loading />
        </div>
      )}
      {!loading && debouncedActive && !!inputText.trim() && (
        /* @ts-ignore */
        <BaseButton
          className={styles.closeContainer}
          onClick={() => {
            reset()
          }}
        >
          <MdCancel fontSize={22} />
        </BaseButton>
      )}
      <BaseInput
        /* @ts-ignore */
        onChange={(text: string) => !loading && setInputText(text)}
        disabled={disabled}
        invalid={!active && error && error.trim().length !== 0}
        onBlur={() => {
          if (isEmpty(filteredLocations)) {
            reset()
          }
          onBlur()
        }}
        value={inputText}
        onFocus={onFocus}
      />
      {debouncedActive && !loading && !!inputText.trim() && (
        <div className={styles.locationsList}>
          {map(filteredLocations, (location) => (
            /* @ts-ignore */
            <BaseButton
              key={location._id}
              onClick={() => {
                setInputText(`${location.city}, ${location.country} `)
                if (location._id) onChange(location._id)
              }}
            >{`${location.city}, ${location.country}`}</BaseButton>
          ))}
        </div>
      )}
      <InputErrorText error={active ? null : error} />
    </div>
  )
}

export const GoogleInput: React.FunctionComponent<Props> = () => {
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
  disabled?: boolean
  loading?: boolean
}

const Component: React.FunctionComponent<ComponentProps> = ({
  name,
  label,
  isRequired,
  disabled,
  loading,
}) => {
  if (!name) return null
  return (
    <Field
      name={name}
      component={BaseLocationInput}
      props={{ label, name, isRequired, disabled, loading }}
    />
  )
}

export default Component
