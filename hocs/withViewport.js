/* eslint-disable lines-between-class-members */
import React from 'react'

const withViewport = () => Component => {
  class Wrapper extends React.Component {
    static getInitialProps(context) {
      if (Component.getInitialProps) {
        return Component.getInitialProps(context)
      }
      return {}
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        windowWidth: process.browser ? window.innerWidth : 768,
        windowHeight: process.browser ? window.innerHeight : 768,
      }
    }

    componentDidMount() {
      if (process.browser && window)
        window.addEventListener('resize', this.resizeWindow)
    }

    componentWillUnmount() {
      if (process.browser && window)
        window.removeEventListener('resize', this.resizeWindow)
    }

    resizeWindow = () => {
      this.setState({ windowWidth: window.innerWidth })
      this.setState({ windowHeight: window.innerHeight })
    }

    render() {
      const { windowWidth, windowHeight } = this.state
      const isMobile = windowWidth <= 768
      const isTablet = windowWidth <= 1280 && !isMobile
      const isDesktop = !isMobile && !isTablet
      return (
        <Component
          isTablet={isTablet}
          isMobile={isMobile}
          isDesktop={isDesktop}
          isHorizontalMobile={windowHeight < 768}
          ww={windowWidth}
          wh={windowHeight}
          {...this.props}
        />
      )
    }
  }

  return Wrapper
}

export default withViewport
