import React from 'react'
import {
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
  MdLooks4,
  MdLooks5,
  MdLooks6,
} from 'react-icons/md'
import classNames from 'classnames'
import times from 'lodash/times'
import styles from './Steppers.module.scss'

type Step = number

type IconProp = Record<any, any>
const Icons: IconProp = {
  1: <MdLooksOne />,
  2: <MdLooksTwo />,
  3: <MdLooks3 />,
  4: <MdLooks4 />,
  5: <MdLooks5 />,
  6: <MdLooks6 />,
}

type Props = {
  steps: Step
  currentStep: number
  setStep: (n: number) => void
}

const Steppers: React.FunctionComponent<Props> = ({
  steps,
  currentStep,
  setStep,
}) => {
  // 3 - 45%
  // 100% / (3-1) = 50 - 5
  return (
    <div className={styles.container}>
      {times(steps, (step): any => {
        const lastItem = step + 1 === steps
        return (
          <div
            key={step}
            className={classNames(
              styles.step,
              currentStep >= step + 1 && styles.active
            )}
            style={!lastItem ? { width: `${100 / (steps - 1) - 5}%` } : {}}
          >
            <button onClick={() => setStep(step + 1)}>{Icons[step + 1]}</button>
            {!lastItem && <hr />}
          </div>
        )
      })}
    </div>
  )
}

export default Steppers
