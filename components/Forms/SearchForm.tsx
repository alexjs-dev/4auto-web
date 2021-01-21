/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { reduxForm, formValueSelector, change } from 'redux-form'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { fieldTypes } from '../../utils/formValidators'
import Creators from '../../store/vehicles/creators'
import {
  modelsSelector,
  makesSelector,
  modelsLoadingSelector,
  makesLoadingSelector,
} from '../../store/vehicles/selectors'
import { transmissionTypes, bodyType, fuelTypes } from '../../consts/vehicle'
import { Select, Checkbox, ExpandButton, Button } from '../'
import SearchFormExtras from './parts/SearchFormExtras'
import {
  mapBaseOptions,
  mapVehicleTranslatableOptions,
  toQueryBasic,
} from '../../utils/helpers'
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
  const dispatch = useDispatch()
  const models = useSelector(modelsSelector)
  const makes = useSelector(makesSelector)
  const loadingModels = useSelector(modelsLoadingSelector)
  const loadingMakes = useSelector(makesLoadingSelector)

  const modelsOptions = mapBaseOptions(models)
  const makesOptions = mapBaseOptions(makes)

  const selectFormValue = formValueSelector(form)
  const selectedMake = useSelector((state) =>
    selectFormValue(state, fieldTypes.make)
  )

  const router = useRouter()

  useEffect(() => {
    dispatch(Creators.fetchModels())
    dispatch(Creators.fetchMakes())
  }, [])

  useEffect(() => {
    if (selectedMake) {
      dispatch(change(form, fieldTypes.model, null))
      dispatch(
        Creators.fetchModels({ resetPagination: true, makeId: selectedMake })
      )
    }
  }, [selectedMake])

  const [openExpand, setOpenExpand] = useState(false)
  const { t } = useTranslation()
  const onSubmit = async (values: any) => {
    const query = toQueryBasic(values)
    if (query) {
      router.push({
        pathname: '/search',
        query,
      })
    }
  }

  const transmissions = mapVehicleTranslatableOptions(transmissionTypes, t)
  const vehicleBodyTypes = mapVehicleTranslatableOptions(bodyType, t)
  const fuels = mapVehicleTranslatableOptions(fuelTypes, t)

  return (
    <form
      className={classNames(styles.container, className, fluid && styles.fluid)}
      onSubmit={() => handleSubmit(onSubmit)}
    >
      <div className={styles.row}>
        <Select
          label={t('label.make')}
          fluid
          loading={loadingMakes}
          placeholder={t('placeholder.make')}
          name={fieldTypes.make}
          options={makesOptions}
        />
        <Select
          label={t('label.model')}
          fluid
          loading={loadingModels}
          placeholder={t('placeholder.model')}
          name={fieldTypes.model}
          options={modelsOptions}
        />
      </div>
      <div className={styles.row}>
        <Select
          label={t('label.fuel')}
          fluid
          placeholder={t('placeholder.fuel')}
          name={fieldTypes.fuel}
          options={fuels}
        />
        <Select
          label={t('label.gearbox')}
          fluid
          placeholder={t('placeholder.gearbox')}
          name={fieldTypes.gearbox}
          options={transmissions}
        />
      </div>
      <Select
        label={t('label.bodyType')}
        fluid
        multiple
        placeholder={t('placeholder.bodyType')}
        name={fieldTypes.bodyType}
        className={styles.marginBottom}
        options={vehicleBodyTypes}
      />
      <div className={styles.row}>
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
        onClick={() => handleSubmit(onSubmit)}
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
})(SearchFormComponent)

export default SearchForm
