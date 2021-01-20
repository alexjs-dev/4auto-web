import { useEffect } from 'react'

const useOutsideClick = ({ ref, isOpen, setOpen }) =>
  useEffect(() => {
    if (!process.browser) return null

    const handleClick = (e) => {
      if (
        ref.current &&
        e.target &&
        !ref.current.contains(e.target) &&
        isOpen
      ) {
        if (setOpen) setOpen(false)
      }
    }
    if (ref.current) {
      document.addEventListener('click', handleClick)
      document.addEventListener('keyup', handleClick)
    }
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keyup', handleClick)
    }
  }, [ref.current, isOpen])

export default useOutsideClick
