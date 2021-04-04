import React, { useEffect, useState, useRef } from 'react'
// import { FiMoreVertical } from 'react-icons/fi'
import useUser from '../../hooks/useUser'
import get from 'lodash/get'
import map from 'lodash/map'
import { useTranslation } from 'react-i18next'
import useOutsideClick from '../../hooks/useOutsideClick'
import { listingsSelector } from '../../store/listing/selectors'
import { useSelector } from 'react-redux'
import { Layout, Button } from '../../components'
import ListingType from '../../types/listing'
import { useRouter } from 'next/router'
import { getVehicleTitle } from '../../utils/helpers'
import styles from './favorites.module.scss'

type ListingProps = {
  listing: ListingType
}
const Listing: React.FunctionComponent<ListingProps> = ({ listing }) => {
  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)
  useOutsideClick({ ref, isOpen, setOpen })
  const { t } = useTranslation()
  if (!listing) return null
  const vehicleTitle = getVehicleTitle(
    {
      make: listing.vehicle.model.make.name,
      model: listing.vehicle.model.name,
      power: listing.vehicle.power,
      capacity: listing.vehicle.capacity,
    },
    t
  )

  return (
    <div className={styles.listing}>
      <div className={styles.image}>
        <img
          alt={vehicleTitle}
          src={get(listing.vehicle, 'images[0].url', '')}
        />
      </div>
      <div className={styles.content}>
        <h2>{vehicleTitle}</h2>
        <div className={styles.buttons}>
          <Button
            label="View"
            type={Button.types.GHOST}
            fluid
            isInternalLink
            href={`/listing/${listing._id}`}
          />
          <Button
            label="Delete"
            type={Button.types.GHOST}
            color={Button.colors.RED}
            fluid
          />
        </div>
        <p>{listing.price} €</p>
        {/* <div className={styles.options}>
          <FiMoreVertical fontSize={32} color="#d1d1d6" />
        </div> */}
      </div>
    </div>
  )
}

const FavoritesPage: React.FunctionComponent = () => {
  const { isLoggedIn } = useUser()
  const { push } = useRouter()
  const { t } = useTranslation()
  const listings: ListingType[] = useSelector(listingsSelector)

  useEffect(() => {
    if (!isLoggedIn) push('/')
  }, [isLoggedIn])

  if (!isLoggedIn) return null

  return (
    <div className={styles.container}>
      <h1>{t('titles.favorites')}</h1>
      <Layout>
        {map(listings, (listing: ListingType) => (
          <Listing listing={listing} key={listing._id} />
        ))}
      </Layout>
    </div>
  )
}

export default FavoritesPage
