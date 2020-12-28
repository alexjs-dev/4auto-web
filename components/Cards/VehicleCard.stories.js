import Component from './VehicleCard.js'
import { transmissionTypes, fuelTypes, bodyType } from '~consts/vehicle'

export default {
  title: 'Vehicle Card',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const VehicleCard = Template.bind({})
VehicleCard.args = {
  _id: '123',
  model: 'A6',
  make: 'Audi',
  regDate: '2012/2',
  power: 110,
  capacity: 3000,
  mileage: 228000,
  bodyType: bodyType.sedan,
  price: 5000,
  discountPercentage: 5,
  fuel: fuelTypes.diesel,
  transmission: transmissionTypes.automatic,
  city: 'Tallinn',
  countryCode: 'EE',
  country: 'Estonia',
  urgent: true,
  featured: true,
  recommended: true,
  images: [
    {
      order: 0,
      url:
        'https://res.cloudinary.com/forautocloud/image/upload/v1609179324/static/mazda2_pzssxu.png',
    },
  ],

  argTypes: {
    bodyType: {
      control: {
        type: 'select',
        options: Object.keys(bodyType),
      },
    },
    fuel: {
      control: {
        type: 'select',
        options: Object.keys(fuelTypes),
      },
    },
    transmission: {
      control: {
        type: 'select',
        options: Object.keys(transmissionTypes),
      },
    },
  },
}
