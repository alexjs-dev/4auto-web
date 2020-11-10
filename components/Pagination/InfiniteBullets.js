import React from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import styles from './InfiniteBullets.module.scss'

const InfiniteBullets = ({ slideRightAnim, slideLeftAnim }) => {
  return (
    <div className={styles.container}>
      <CSSTransition
        unmountOnExit={false}
        in={slideRightAnim}
        timeout={{ appear: 0, enter: 0, exit: 300 }}
        classNames="slide-right"
        appear
      >
        <div className={styles.dot} />
      </CSSTransition>

      <CSSTransition
        unmountOnExit={false}
        in={slideRightAnim || slideLeftAnim}
        timeout={{ appear: 0, enter: 0, exit: 300 }}
        classNames={slideRightAnim ? 'bounce-up' : 'bounce-down'}
        appear
      >
        <div className={classNames(styles.dot, styles.active)} />
      </CSSTransition>
      <CSSTransition
        unmountOnExit={false}
        in={slideLeftAnim}
        timeout={{ appear: 0, enter: 0, exit: 300 }}
        classNames="slide-left"
        appear
      >
        <div className={styles.dot} />
      </CSSTransition>
    </div>
  )
}

export default React.memo(InfiniteBullets)
