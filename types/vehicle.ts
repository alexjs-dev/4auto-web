import Image from './image'
import Model from './model'
import VehicleExtras from './vehicleExtras'

type Vehicle = {
  _id: string
  VIN?: string
  accelerationZeroToHundred?: number
  bodyType:
    | 'sedan'
    | 'hatchback'
    | 'touring'
    | 'minivan'
    | 'coupe'
    | 'cabriolet'
    | 'pickup'
    | 'limousine'
    | 'truck'
    | 'motorbike'
    | 'trailer'
    | 'other'
  capacity: number
  color?:
    | 'white'
    | 'silver'
    | 'black'
    | 'gold'
    | 'blue'
    | 'red'
    | 'purple'
    | 'yellow'
    | 'pink'
    | 'green'
    | 'orange'
    | 'gray'
    | 'brown'
  consumptionCombined?: number
  consumptionHighway?: number
  consumptionUrban?: number
  crashed?: boolean
  createdAt: string
  driveTrain: 'frontWheel' | 'rearWheel' | 'fourWheel'
  emissionStandard?: '6' | '5' | '4' | '3' | '2' | '1'
  fuel:
    | 'petrol'
    | 'gasLng'
    | 'gasLpg'
    | 'gasCng'
    | 'diesel'
    | 'hybrid'
    | 'electric'
    | 'ethanol'
  fuelTankCapacity?: number
  height?: number
  images: Image[]
  interiorColor?: 'light' | 'dark'
  meta?: any
  metallicColor?: boolean
  mileage: number
  model: Model
  modelId: string
  power: number
  regDate: string
  regNumber: string
  transmission: 'semiAutomatic' | 'automatic' | 'manual'
  updatedAt: string
  userId: string
  vehicleExtras: VehicleExtras
  vehicleExtrasId: string
  weight?: number
}

export default Vehicle
