import React from 'react'
import map from 'lodash/map'
import { useTranslation } from 'react-i18next'
import { ColorPicker, Input, Select } from '~/components'
import { fieldTypes } from '~/utils/formValidators'
import styles from './BaseVehicleFields.module.scss'

const AdvVehicleFields = () => {
  const { t } = useTranslation()
  return (
    <>
      <ColorPicker
        name={fieldTypes.color}
        allowEmpty
        label={t('label.color')}
      />
      <Input
        /* @ts-ignore */
        name="year"
        label={t('label.year')}
        placeholder="2020"
        isRequired
        type="number"
      />
      {/* @ts-ignore */}
      <Select
        label={t('label.month')}
        fluid
        isRequired
        className={styles.spacing}
        placeholder={t('label.january')}
        name="month"
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
          (label, index) => ({ value: index, label: t(`label.${label}`) })
        )}
      />
      <Input
        /* @ts-ignore */
        name={fieldTypes.mileage}
        label={t('label.mileage')}
        placeholder="0"
        isRequired
        type="number"
        className={styles.spacing}
      />
      <h4 className={styles.spacing}>{t('titles.vehicleDetails')}</h4>
      <div className={styles.row}>
        <Input
          /* @ts-ignore */
          name={fieldTypes.mileage}
          label={t('label.power')}
          placeholder="110"
          isRequired
          type="number"
        />
        <Input
          /* @ts-ignore */
          name={fieldTypes.capacity}
          label={t('label.capacity')}
          placeholder="2.5"
          isRequired
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
          isRequired
          type="number"
        />
        <Input
          /* @ts-ignore */
          name={fieldTypes.consumptionHighway}
          label={t('label.consumptionHighway')}
          placeholder="6.5"
          isRequired
          type="number"
        />
      </div>
      <div className={styles.row}>
        <Input
          /* @ts-ignore */
          name={fieldTypes.consumptionUrban}
          label={t('label.consumptionUrban')}
          placeholder="11"
          isRequired
          type="number"
        />
        <Input
          /* @ts-ignore */
          name={fieldTypes.fuelTankCapacity}
          label={t('label.fuelTankCapacity')}
          placeholder="60"
          isRequired
          type="number"
        />
      </div>
    </>
  )
}

export default AdvVehicleFields
