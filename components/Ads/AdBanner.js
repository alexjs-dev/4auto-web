import React from 'react'
import { Button } from '~components'
import styles from './AdBanner.module.scss'

const AdBanner = ({
  title,
  subtitle,
  hrefTitle,
  href,
  img,
  backgroundImage,
}) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.image}>
        <img src={img} alt={title} draggable="false" />
      </div>
      <div className={styles.text}>
        <div>
          <h5>{title}</h5>
          <p>{subtitle}</p>
        </div>
        <Button
          href={href}
          type={Button.types.GHOST}
          label={hrefTitle}
          fluid
          className={styles.button}
          color={Button.colors.WHITE}
        />
      </div>
    </div>
  )
}

export default AdBanner
