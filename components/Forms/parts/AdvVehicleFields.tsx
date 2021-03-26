import React from 'react'
import map from 'lodash/map'
import toString from 'lodash/toString'
import { useTranslation } from 'react-i18next'
import includes from 'lodash/includes'
import {
  ColorPicker,
  Input,
  Select,
  ItemDropDown,
  Checkbox,
} from '~/components'
import { fieldTypes } from '~/utils/formValidators'
import styles from './BaseVehicleFields.module.scss'
import config from '../../../components/Vehicle/vehicleAdvDetailsConfig.json'

type Props = {
  item: {
    key: string
    type: string
    hideOnEmpty?: boolean
    hideOnEdit?: boolean
    list?: string[]
  }
}

const Detail: React.FunctionComponent<Props> = ({ item }) => {
  const { key, type } = item
  const { t } = useTranslation()
  if (item.hideOnEdit) return null
  switch (type) {
    case 'boolean':
      return (
        /* @ts-ignore */
        <Checkbox
          name={key}
          label={t(`label.${key}`)}
          className={styles.checkbox}
        />
      )
    case 'enum':
      return (
        /* @ts-ignore */
        <Select
          fluid
          label={t(`label.${key}`)}
          name={key}
          className={styles.spacing}
          options={map(item.list, (option) => ({
            value: option,
            label: t(`label.${option}`),
          }))}
        />
      )
    case 'string':
    case 'number':
      return (
        <Input
          /* @ts-ignore */
          fluid
          name={key}
          label={t(`label.${key}`)}
          type={type === 'string' ? 'text' : 'number'}
        />
      )
    default:
      return null
  }
}

type FormProps = {
  requiredFields?: string[]
}

const AdvVehicleFields: React.FunctionComponent<FormProps> = ({
  requiredFields,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <ColorPicker
        name={fieldTypes.color}
        allowEmpty
        label={t('label.color')}
      />
      {/*@ts-ignore */}
      <Checkbox
        name="metallicColor"
        label={t('label.metallicColor')}
        className={styles.checkbox}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.year}
        label={t('label.year')}
        placeholder="2020"
        isRequired={includes(requiredFields, fieldTypes.year)}
        type={fieldTypes.year}
      />
      {/* @ts-ignore */}
      <Select
        label={t('label.month')}
        fluid
        isRequired={includes(requiredFields, fieldTypes.month)}
        className={styles.spacing}
        placeholder={t('label.january')}
        name={fieldTypes.month}
        options={map(
          [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
          ],
          (label, index) => ({
            value: toString(index),
            label: t(`label.${label}`),
          })
        )}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.mileage}
        label={t('label.mileage')}
        placeholder="0"
        isRequired={includes(requiredFields, fieldTypes.mileage)}
        type="number"
        className={styles.spacing}
      />
      <h4 className={styles.spacing}>{t('titles.vehicleDetails')}</h4>
      <div className={styles.row}>
        <Input
          /* @ts-ignore */
          name={fieldTypes.power}
          label={t('label.power')}
          placeholder="110"
          isRequired={includes(requiredFields, fieldTypes.power)}
          type="number"
        />
        <Input
          /* @ts-ignore */
          name={fieldTypes.capacity}
          label={t('label.capacity')}
          placeholder="2.5"
          step="0.1"
          isRequired={includes(requiredFields, fieldTypes.capacity)}
          type="number"
        />
      </div>
      <h4 className={styles.spacing}>{t('titles.consumptionDetails')}</h4>
      <div className={styles.row}>
        <Input
          /* @ts-ignore */
          name={fieldTypes.consumptionCombined}
          label={t('label.consumptionCombined')}
          placeholder="8.5"
          step="0.1"
          isRequired={includes(requiredFields, fieldTypes.consumptionCombined)}
          type="number"
        />
        <Input
          /* @ts-ignore */
          name={fieldTypes.consumptionHighway}
          isRequired={includes(requiredFields, fieldTypes.consumptionHighway)}
          label={t('label.consumptionHighway')}
          placeholder="6.5"
          type="number"
        />
      </div>
      <div className={styles.row}>
        <Input
          /* @ts-ignore */
          name={fieldTypes.consumptionUrban}
          isRequired={includes(requiredFields, fieldTypes.consumptionUrban)}
          label={t('label.consumptionUrban')}
          placeholder="11"
          step="0.1"
          type="number"
        />
        <Input
          /* @ts-ignore */
          name={fieldTypes.fuelTankCapacity}
          label={t('label.fuelTankCapacity')}
          placeholder="60"
          type="number"
        />
      </div>
      {config?.data &&
        config.data.map(({ key, list }) => (
          <ItemDropDown title={t(`label.${key}`)}>
            {map(list, (item) => (
              /* @ts-ignore */
              <Detail key={item.key} item={item} />
            ))}
          </ItemDropDown>
        ))}
    </>
  )
}

export default AdvVehicleFields
