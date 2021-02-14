import React from 'react'
import styles from '../listing.module.scss'

type Props = {
  price: number
  discountPercentage?: number
}

const Price: React.FunctionComponent<Props> = ({
  price,
  discountPercentage,
}) => {
  const discountedPrice =
    (discountPercentage && price - (price * discountPercentage) / 100) || 0

  return (
    <div className={styles.prices}>
      {discountedPrice <= 0 && <span>{price}€</span>}
      {discountedPrice > 0 && (
        <span>
          {discountedPrice.toFixed(2)}€&nbsp;<strong>{price}€</strong>
        </span>
      )}
    </div>
  )
}

export default Price
