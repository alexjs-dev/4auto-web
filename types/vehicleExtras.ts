type VehicleExtras = {
  abs?: boolean
  alarm?: boolean
  bluetooth?: boolean
  cdPlayer?: boolean
  centralLocking?: boolean
  climateControl?: boolean
  createdAt: string
  cruiseControl?: boolean
  disabilityEquipment?: boolean
  doors?: number
  electricAdjSeats?: boolean
  electricWindows?: boolean
  handsFree?: boolean
  immobilizer?: boolean
  lights?: 'xenon' | 'halogen' | 'other'
  memorySeats?: boolean
  memoryWheel?: boolean
  mirrorHeating?: boolean
  mirrorLink?: boolean
  navSystem?: boolean
  panoramaRoof?: boolean
  parkingAid?: boolean
  parkingCamera?: boolean
  rainSensor?: boolean
  rightHandDrive?: boolean
  seatHeating?: boolean
  seatType?: 'sports' | 'standard'
  seats?: number
  selfDriving?: boolean
  startStop?: boolean
  sunRoof?: boolean
  tireSize?: number
  towbar?: boolean
  updatedAt: string
  warrantyBook?: boolean
  wifi?: boolean
  __v?: number
  _id: string
}

export default VehicleExtras
