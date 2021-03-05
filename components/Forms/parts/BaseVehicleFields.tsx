import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  modelsSelector,
  makesSelector,
  modelsLoadingSelector,
  makesLoadingSelector,
} from '../../../store/vehicles/selectors'
import { transmissionTypes, bodyType, fuelTypes } from '../../../consts/vehicle'
import { Select } from '../..'
import {
  mapBaseOptions,
  mapVehicleTranslatableOptions,
} from '../../../utils/helpers'
import { fieldTypes } from '../../../utils/formValidators'
import styles from './BaseVehicleFields.module.scss'

type Props = {
  singleVehicleBodySelect?: boolean
}

const BaseVehicleFields: React.FunctionComponent<Props> = ({
  singleVehicleBodySelect,
}) => {
  const { t } = useTranslation()
  const models = useSelector(modelsSelector)
  const makes = useSelector(makesSelector)
  const loadingModels = useSelector(modelsLoadingSelector)
  const loadingMakes = useSelector(makesLoadingSelector)

  const modelsOptions = mapBaseOptions(models)
  const makesOptions = mapBaseOptions(makes)

  const transmissions = mapVehicleTranslatableOptions(transmissionTypes, t)
  const vehicleBodyTypes = mapVehicleTranslatableOptions(bodyType, t)
  const fuels = mapVehicleTranslatableOptions(fuelTypes, t)

  return (
    <>
      <div className={styles.row}>
        {/* @ts-ignore */}
        <Select
          label={t('label.make')}
          fluid
          loading={loadingMakes}
          placeholder={t('placeholder.make')}
          name={fieldTypes.make}
          options={makesOptions}
        />
        {/* @ts-ignore */}
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
        {/* @ts-ignore */}
        <Select
          label={t('label.fuel')}
          fluid
          placeholder={t('placeholder.fuel')}
          name={fieldTypes.fuel}
          options={fuels}
        />
        {/* @ts-ignore */}
        <Select
          label={t('label.gearbox')}
          fluid
          placeholder={t('placeholder.gearbox')}
          name={fieldTypes.gearbox}
          options={transmissions}
        />
      </div>
      {/* @ts-ignore */}
      <Select
        label={t('label.bodyType')}
        fluid
        multiple={!singleVehicleBodySelect}
        placeholder={t('placeholder.bodyType')}
        name={fieldTypes.bodyType}
        className={styles.marginBottom}
        options={vehicleBodyTypes}
      />
    </>
  )
}

export default BaseVehicleFields
