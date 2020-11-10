import { useState, useEffect } from 'react'

const defaultValues = {
  width: 320,
  height: 400,
  isTablet: false,
  isMobile: true,
  isDesktop: false,
}

const isServer = !process.browser || !window

const getWidth = () => (isServer ? defaultValues.width : window.innerWidth)
const getHeight = () => (isServer ? defaultValues.height : window.innerHeight)

const useViewport = () => {
  const [width, setWidth] = useState(getWidth())
  const [height, setHeight] = useState(getHeight())
  const isMobile = width <= 768
  const isTablet = width <= 1280 && !isMobile
  const isDesktop = !isMobile && !isTablet
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(getWidth())
      setHeight(getHeight())
    }
    if (process.browser) window.addEventListener('resize', handleWindowResize)
    return () => {
      if (process.browser)
        window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return { width, height, isTablet, isMobile, isDesktop }
}

export default useViewport
