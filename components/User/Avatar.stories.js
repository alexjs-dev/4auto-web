import Component from './Avatar.js'

export default {
  title: 'Avatar',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const Avatar = Template.bind({})
Avatar.args = {
  title: 'SELLER',
  src:
    'https://static01.nyt.com/images/2019/05/18/arts/johnwick-anatomy/johnwick-anatomy-videoSixteenByNineJumbo1600-v2.jpg',
  username: 'John Wick',
  profileUrl: 'https://www.google.com',
}
