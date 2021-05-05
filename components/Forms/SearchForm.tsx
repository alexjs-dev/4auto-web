/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { reduxForm, reset, getFormValues, change } from 'redux-form' // tslint:disable
import classNames from 'classnames'
import useFetchVehicleModels from '../../hooks/useFetchVehicleModels'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import useModal from '../../hooks/useModal'
import { useTranslation } from 'react-i18next'
import { fieldTypes } from '../../utils/formValidators'
import { Checkbox, ExpandButton, Button } from '../'
import SearchFormExtras from './parts/SearchFormExtras'
import BaseVehicleFields from './parts/BaseVehicleFields'
import { toQueryBasic } from '../../utils/helpers'
import styles from './SearchForm.module.scss'

const form = 'searchForm'

type Props = {
  className?: string | null
  fluid?: boolean
  cb?: () => void
  defaultExpanded?: boolean
  dirty: boolean
  handleSubmit: (fn: any) => void
}

const createResetFieldsMap = (fields: any, formValues: any, cb: any) => {
  return reduce(
    fields,
    (prev, field) => {
      const value = get(formValues, field)
      if (!prev) prev = {}
      if (value && value !== '') {
        return {
          ...prev,
          [field]: cb(field),
        }
      }
      return prev
    },
    {}
  )
}

const SearchFormComponent: React.FunctionComponent<Props> = ({
  className,
  fluid,
  cb,
  defaultExpanded,
  handleSubmit,
  dirty,
}) => {
  const router = useRouter()
  useFetchVehicleModels(form)
  const [openExpand, setOpenExpand] = useState(defaultExpanded || false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (defaultExpanded) setOpenExpand(true)
  }, [defaultExpanded])

  /* @ts-ignore */
  const [_, __, closeModal] = useModal()
  const { t } = useTranslation()
  const onSubmit = (values: any) => {
    const query = toQueryBasic(values)
    closeModal()
    if (query) {
      router.push({
        pathname: '/search',
        query,
      })
    }
    if (cb) cb()
  }

  const formValues = useSelector(getFormValues(form))

  const resetFields = createResetFieldsMap(
    [
      fieldTypes.make,
      fieldTypes.model,
      fieldTypes.fuel,
      fieldTypes.gearbox,
      fieldTypes.bodyType,
    ],
    formValues,
    (field: string) => () => dispatch(change(form, field, ''))
  )

  return (
    <form
      className={classNames(styles.container, className, fluid && styles.fluid)}
      onSubmit={() => handleSubmit(onSubmit)}
    >
      <BaseVehicleFields
        onReset={!dirty ? undefined : () => dispatch(reset(form))}
        resetFields={resetFields}
      />
      <div className={styles.row}>
        {/* @ts-ignore */}
        <Checkbox name={fieldTypes.remember} label={t('label.remember')} />
        <div />
      </div>

      <div className={styles.row}>
        <ExpandButton
          open={openExpand}
          onToggle={() => setOpenExpand(!openExpand)}
        />

        {/* <Button type={Button.types.GHOST}>{t('button.advancedSearch')}</Button> */}
      </div>

      {openExpand && <SearchFormExtras />}

      <Button
        type={Button.types.PRIMARY}
        fluid
        baseType="submit"
        onClick={handleSubmit(onSubmit)}
      >
        {t('button.search')}
      </Button>
    </form>
  )
}

SearchFormComponent.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

SearchFormComponent.defaultProps = {
  className: null,
}

const SearchForm = reduxForm({
  form,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(SearchFormComponent)

export default SearchForm
