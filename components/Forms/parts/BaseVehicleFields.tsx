import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import includes from 'lodash/includes'
import get from 'lodash/get'
import { FiTrash2 } from 'react-icons/fi'
import {
  modelsSelector,
  makesSelector,
  modelsLoadingSelector,
  makesLoadingSelector,
} from '../../../store/vehicles/selectors'
import { transmissionTypes, bodyType, fuelTypes } from '../../../consts/vehicle'
import { Button, Select } from '../..'
import {
  mapBaseOptions,
  mapVehicleTranslatableOptions,
} from '../../../utils/helpers'
import { fieldTypes } from '../../../utils/formValidators'
import styles from './BaseVehicleFields.module.scss'

type Props = {
  singleVehicleBodySelect?: boolean
  requiredFields?: string[]
  onReset?: any
  resetFields?: any
}

const BaseVehicleFields: React.FunctionComponent<Props> = ({
  singleVehicleBodySelect,
  requiredFields,
  onReset,
  resetFields,
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
      {onReset && (
        <div className={styles.buttonReset}>
          <Button
            color={Button.colors.RED}
            type={Button.types.GHOST}
            onClick={onReset}
          >
            <FiTrash2 />
          </Button>
        </div>
      )}

      <div className={styles.row}>
        {/* @ts-ignore */}
        <Select
          label={t('label.make')}
          fluid
          searchable={false}
          loading={loadingMakes}
          placeholder={t('placeholder.make')}
          isRequired={includes(requiredFields, fieldTypes.make)}
          name={fieldTypes.make}
          options={makesOptions}
          onReset={get(resetFields, fieldTypes.make)}
        />
        {/* @ts-ignore */}
        <Select
          label={t('label.model')}
          fluid
          searchable={false}
          loading={loadingModels}
          placeholder={t('placeholder.model')}
          name={fieldTypes.model}
          isRequired={includes(requiredFields, fieldTypes.model)}
          options={modelsOptions}
          onReset={get(resetFields, fieldTypes.model)}
        />
      </div>
      <div className={styles.row}>
        {/* @ts-ignore */}
        <Select
          label={t('label.fuel')}
          fluid
          placeholder={t('placeholder.fuel')}
          name={fieldTypes.fuel}
          isRequired={includes(requiredFields, fieldTypes.fuel)}
          options={fuels}
          onReset={get(resetFields, fieldTypes.fuel)}
        />
        {/* @ts-ignore */}
        <Select
          label={t('label.gearbox')}
          fluid
          placeholder={t('placeholder.gearbox')}
          name={fieldTypes.gearbox}
          isRequired={includes(requiredFields, fieldTypes.gearbox)}
          options={transmissions}
          onReset={get(resetFields, fieldTypes.gearbox)}
        />
      </div>
      <div className={styles.spacing}>
        {/* @ts-ignore */}
        <Select
          label={t('label.bodyType')}
          fluid
          multiple={!singleVehicleBodySelect}
          isRequired={includes(requiredFields, fieldTypes.bodyType)}
          placeholder={t('placeholder.bodyType')}
          name={fieldTypes.bodyType}
          className={styles.marginBottom}
          onReset={get(resetFields, fieldTypes.bodyType)}
          options={vehicleBodyTypes}
        />
      </div>
    </>
  )
}

export default BaseVehicleFields
