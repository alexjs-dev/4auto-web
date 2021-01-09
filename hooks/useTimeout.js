import { useEffect, useRef } from 'react'

export const useTimeout = (callback, timeout, timeHandler, deps = []) => {
  const refCallback = useRef()
  const refTimer = useRef()

  useEffect(() => {
    refCallback.current = callback
  }, [callback])

  useEffect(() => {
    const timerID = timeHandler.setTimeout(refCallback.current, timeout)
    refTimer.current = timerID

    // cleans the timer identified by timerID when the effect is unmounted.
    return () => timeHandler.clearTimeout(timerID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  function cancelTimer() {
    return timeHandler.clearTimeout(refTimer.current)
  }

  return cancelTimer
}

export default useTimeout
