import Component from './Loader.js'

export default {
  title: 'Loader',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const Loader = Template.bind({})
Loader.args = {
    loading: false,
    centered: false,
    invert: false,
    fullscreen: false,
    isBranded: false,
}
