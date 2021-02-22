import React from 'react'
import VehicleDetail from './VehicleDetail'
import { useTranslation } from 'react-i18next'
import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import styles from './VehicleAdvDetails.module.scss'
import Vehicle from '~/types/vehicle'
import Checkbox from '../Input/Checkbox'

type Props = {
  vehicle: Vehicle
}

type DetailProps = {
  title?: any
  content: boolean | string | undefined | number
  hideOnEmpty?: boolean
}

const Detail: React.FunctionComponent<DetailProps> = ({
  title,
  content,
  hideOnEmpty,
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
  return <VehicleDetail title={title}>{content.toString()}</VehicleDetail>
}

const VehicleAdvDetails: React.FunctionComponent<Props> = ({ vehicle }) => {
  const { t } = useTranslation()
  if (!vehicle) return null
  const {
    abs,
    alarm,
    centralLocking,
    disabilityEquipment,
    immobilizer,
    parkingAid,
    parkingCamera,
    bluetooth,
    cdPlayer,
    climateControl,
    cruiseControl,
    electricAdjSeats,
    electricWindows,
    handsFree,
    memorySeats,
    memoryWheel,
    mirrorHeating,
    mirrorLink,
    navSystem,
    panoramaRoof,
    rainSensor,
    seatHeating,
    selfDriving,
    startStop,
    sunRoof,
    seatType,
    lights,
    towbar,
    warrantyBook,
    doors,
    tireSize,
    rightHandDrive,
  } = vehicle.vehicleExtras
  return (
    <div className={styles.detailContainer}>
      <section className={styles.details}>
        <h5>{t('label.safety')}</h5>
        <div className={styles.list}>
          <Detail title={t('label.alarm')} content={alarm} />
          <Detail title={t('label.centralLocking')} content={centralLocking} />
          <Detail
            title={t('label.disabilityEquipment')}
            content={disabilityEquipment}
          />
          <Detail title={t('label.immobilizer')} content={immobilizer} />
          <Detail title={t('label.parkingAid')} content={parkingAid} />
          <Detail title={t('label.parkingCamera')} content={parkingCamera} />
          <Detail title={t('label.abs')} content={abs} />
          <Detail
            title={t('label.crashed')}
            content={vehicle.crashed}
            hideOnEmpty
          />
        </div>
      </section>
      <section className={styles.details}>
        <h5>{t('label.comfort')}</h5>
        <div className={styles.list}>
          <Detail
            title={t('label.interiorColor')}
            content={vehicle.interiorColor}
          />
          <Detail title={t('label.bluetooth')} content={bluetooth} />
          <Detail title={t('label.cdPlayer')} content={cdPlayer} />
          <Detail title={t('label.climateControl')} content={climateControl} />
          <Detail title={t('label.cruiseControl')} content={cruiseControl} />
          <Detail
            title={t('label.ElectricAdjSeats')}
            content={electricAdjSeats}
          />
          <Detail
            title={t('label.electricWindows')}
            content={electricWindows}
          />
          <Detail title={t('label.handsFree')} content={handsFree} />
          <Detail title={t('label.memorySeats')} content={memorySeats} />
          <Detail title={t('label.memoryWheel')} content={memoryWheel} />
          <Detail title={t('label.mirrorHeating')} content={mirrorHeating} />
          <Detail
            title={t('label.mirrorLink')}
            content={mirrorLink}
            hideOnEmpty
          />
          <Detail title={t('label.navSystem')} content={navSystem} />
          <Detail title={t('label.panoramaRoof')} content={panoramaRoof} />
          <Detail title={t('label.rainSensor')} content={rainSensor} />
          <Detail title={t('label.seatHeating')} content={seatHeating} />
          <Detail title={t('label.selfDriving')} content={selfDriving} />
          <Detail title={t('label.startStop')} content={startStop} />
          <Detail title={t('label.sunRoof')} content={sunRoof} />
          <Detail title={t('label.seatType')} content={seatType} />
        </div>
      </section>
      <section className={styles.details}>
        <h5>{t('label.technical')}</h5>
        <div className={styles.list}>
          <Detail
            title={t('label.emissionStandard')}
            content={vehicle.emissionStandard}
          />
          <Detail
            title={t('label.fuelTankCapacity')}
            content={vehicle.fuelTankCapacity}
          />
          <Detail title={t('label.height')} content={vehicle.height} />
          <Detail title={t('label.weight')} content={vehicle.weight} />
          <Detail title={t('label.tireSize')} content={tireSize} />
          <Detail
            title={t('label.rightHandDrive')}
            content={rightHandDrive}
            hideOnEmpty
          />
          <Detail title={t('label.capacity')} content={vehicle.capacity} />
        </div>
      </section>
      <section className={styles.details}>
        <h5>{t('label.other')}</h5>
        <div className={styles.list}>
          <Detail title={t('label.vin')} content={vehicle.VIN} />
          <Detail title={t('label.regNumber')} content={vehicle.regNumber} />
          <Detail title={t('label.warrantyBook')} content={warrantyBook} />
          <Detail
            title={t('label.consumptionCombined')}
            content={vehicle.consumptionCombined}
          />
          <Detail
            title={t('label.consumptionHighway')}
            content={vehicle.consumptionHighway}
          />
          <Detail
            title={t('label.consumptionUrban')}
            content={vehicle.consumptionUrban}
          />
        </div>
      </section>
      <section className={styles.details}>
        <h5>{t('label.lights')}</h5>
        <div className={styles.list}>
          <Detail title={t('label.lights')} content={lights} />
        </div>
      </section>
      <section className={styles.details}>
        <h5>{t('label.exterior')}</h5>
        <div className={styles.list}>
          <Detail title={t('label.towbar')} content={towbar} />
          <Detail title={t('label.doors')} content={doors} hideOnEmpty />
          <Detail title={t('label.color')} content={vehicle.color} />
          <Detail
            title={t('label.metallicColor')}
            content={vehicle.metallicColor}
          />
        </div>
      </section>
    </div>
  )
}

export default VehicleAdvDetails
