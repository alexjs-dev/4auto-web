import Component from './ExpandButton.js'

export default {
  title: 'Expand Button',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const ExpandButton = Template.bind({})
ExpandButton.args = {
  open: false,
}
