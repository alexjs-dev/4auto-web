import React from 'react'
import VehicleDetail from './VehicleDetail'
import { useTranslation } from 'react-i18next'
import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import styles from './VehicleAdvDetails.module.scss'
import Vehicle from '~/types/vehicle'
import Checkbox from '../Input/Checkbox'
import config from './vehicleAdvDetailsConfig.json'

type Props = {
  vehicle: Vehicle
}

type DetailProps = {
  title?: any
  content: boolean | string | undefined | number
  hideOnEmpty?: boolean
  unit?: string
}

const Detail: React.FunctionComponent<DetailProps> = ({
  title,
  content,
  hideOnEmpty,
  unit,
}) => {
  const { t } = useTranslation()
  if ((isNil(content) || !content) && hideOnEmpty) return null
  if (isBoolean(content) || isNil(content)) {
    return (
      <VehicleDetail
        title={title}
        className={styles.detail}
        /* @ts-ignore */
        icon={<Checkbox small input={{ value: content }} />}
      >
        {t(`base.${content ? 'yes' : 'no'}`)}
      </VehicleDetail>
    )
  }
  return (
    <VehicleDetail title={title}>
      {content.toString()}
      {unit && <>&nbsp;{t(unit)}</>}
    </VehicleDetail>
  )
}

const VehicleAdvDetails: React.FunctionComponent<Props> = ({ vehicle }) => {
  const { t } = useTranslation()
  if (!vehicle) return null
  return (
    <div className={styles.detailContainer}>
      {config?.data &&
        config.data.map(({ key, list }) => (
          <section className={styles.details} key={key}>
            <h5>{t(`label.${key}`)}</h5>
            <div className={styles.list}>
              {/* @ts-ignore */}
              {list.map((item, index) => (
                <Detail
                  key={item.key}
                  title={t(`label.${item.key}`)}
                  hideOnEmpty={get(item, 'hideOnEmpty', false)}
                  unit={get(item, 'unit')}
                  content={get(
                    vehicle,
                    item.key,
                    get(vehicle.vehicleExtras, item.key)
                  )}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}

export default VehicleAdvDetails
