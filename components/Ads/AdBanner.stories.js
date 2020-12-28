import Component from './AdBanner.js'

export default {
  title: 'Ad Banner',
  component: Component,
}

const Template = (args) => <Component {...args} />

export const AdBanner = Template.bind({})
AdBanner.args = {
  title: 'Banner',
  subtitle: 'Subtitle',
  hrefTitle: 'Click me',
  href: 'https://www.4auto.ee',
  img:
    'https://res.cloudinary.com/forautocloud/image/upload/v1609179324/static/bmw7_oiskp9.png',
  backgroundImage:
    'https://res.cloudinary.com/forautocloud/image/upload/v1609179323/static/city_qlmal7.jpg',
}
