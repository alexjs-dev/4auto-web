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
  title: string | number
  content: boolean | string | undefined
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
        /* @ts-ignore */
        icon={<Checkbox small input={{ value: content }} />}
      >
        {t(`base.${content ? 'yes' : 'no'}`)}
      </VehicleDetail>
    )
  }
  return <VehicleDetail title={title}>{content}</VehicleDetail>
}

const VehicleAdvDetails: React.FunctionComponent<Props> = ({ vehicle }) => {
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
  } = vehicle.vehicleExtras
  return (
    <div className={styles.detailContainer}>
      <div className={styles.details}>
        <h5>Safety</h5>
        <div className={styles.list}>
          <Detail title="Alarm" content={alarm} />
          <Detail title="Central locking" content={centralLocking} />
          <Detail title="Disability Equipment" content={disabilityEquipment} />
          <Detail title="Immobilizer" content={immobilizer} />
          <Detail title="Parking aid" content={parkingAid} />
          <Detail title="Parking camera" content={parkingCamera} />
          <Detail title="Abs" content={abs} />
          <Detail title="Crashed" content={vehicle.crashed} hideOnEmpty />
        </div>
      </div>
      <div className={styles.details}>
        <h5>Comfort</h5>
        <div className={styles.list}>
          <Detail title="Interior" content={vehicle.interiorColor} />
          <Detail title="Bluetooth" content={bluetooth} />
          <Detail title="Cd player" content={cdPlayer} />
          <Detail title="Climate Control" content={climateControl} />
          <Detail title="Cruise Control" content={cruiseControl} />
          <Detail title="Electric Adj Seats" content={electricAdjSeats} />
          <Detail title="Electric Windows" content={electricWindows} />
          <Detail title="Hands free" content={handsFree} />
          <Detail title="Memory Seats" content={memorySeats} />
          <Detail title="Memory Wheel" content={memoryWheel} />
          <Detail title="Mirror Heating" content={mirrorHeating} />
          <Detail title="Mirror Link" content={mirrorLink} hideOnEmpty />
          <Detail title="Nav System" content={navSystem} />
          <Detail title="Panorama Roof" content={panoramaRoof} />
          <Detail title="Rain Sensor" content={rainSensor} />
          <Detail title="Seat Heating" content={seatHeating} />
          <Detail title="Self Driving" content={selfDriving} />
          <Detail title="Start-stop" content={startStop} />
          <Detail title="Sun Roof" content={sunRoof} />
        </div>
      </div>
    </div>
  )
}

export default VehicleAdvDetails
