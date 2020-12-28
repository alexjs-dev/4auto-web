import Component from './Button.js'

export default {
  title: 'Button',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const Button = Template.bind({})
Button.args = {
  label: 'Label',
  visible: true,
  type: 'ghost',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'ghost'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['green', 'white'],
      },
    },
  },
  icon:
    'https://res.cloudinary.com/forautocloud/image/upload/v1609179345/static/logo-mini_vgcmab.svg',
  loading: false,
  fluid: true,
}
