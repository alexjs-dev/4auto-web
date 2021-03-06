/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { reduxForm } from 'redux-form' // tslint:disable
import classNames from 'classnames'
import useFetchVehicleModels from '../../hooks/useFetchVehicleModels'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
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
  handleSubmit: (fn: any) => void
}

const SearchFormComponent: React.FunctionComponent<Props> = ({
  className,
  fluid,
  handleSubmit,
}) => {
  const router = useRouter()
  useFetchVehicleModels(form)
  const [openExpand, setOpenExpand] = useState(false)
  const { t } = useTranslation()
  const onSubmit = (values: any) => {
    const query = toQueryBasic(values)
    if (query) {
      router.push({
        pathname: '/search',
        query,
      })
    }
  }

  return (
    <form
      className={classNames(styles.container, className, fluid && styles.fluid)}
      onSubmit={() => handleSubmit(onSubmit)}
    >
      <BaseVehicleFields />
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
  enableReinitialize: false,
})(SearchFormComponent)

export default SearchForm
