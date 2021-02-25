import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import isEmpty from 'lodash/isEmpty'
import classNames from 'classnames'
import moment from 'moment'
import { GiFemale, GiMale, GiDiamonds } from 'react-icons/gi'
import { Loader, Layout, ListingsCarousel, Button } from '../../components'
import UsersService from '../../services/users'
import { listingsSelector } from '../../store/vehicles/selectors'
import {
  currentUserSelector,
  currentUserLoadingSelector,
} from '../../store/user/selectors'
import UserType from '../../types/user'
import styles from './profile.module.scss'
import useFindUser from '../../hooks/useFindUser'

import ProfileAvatar from './components/ProfileAvatar'
import useFindFeaturedListingsOnMount from '~/hooks/useFindFeaturedListingsOnMount'

type Props = {
  prefetchedUser?: UserType
}

const ProfilePage: React.FunctionComponent<Props> = ({ prefetchedUser }) => {
  const currentUser = useSelector(currentUserSelector)
  const loading = useSelector(currentUserLoadingSelector)
  const router = useRouter()
  const { id } = router.query
  const user: UserType = !isEmpty(prefetchedUser) ? prefetchedUser : currentUser
  useFindUser({ id, prefetchedUser })
  useFindFeaturedListingsOnMount()
  if ((loading && isEmpty(prefetchedUser)) || isEmpty(user)) {
    return (
      <div className={styles.container}>
        <Loader centered loading isBranded fullscreen />
      </div>
    )
  }
  const username =
    user.profile?.username || user.profile?.firstName || 'Username'
  const featuredListings = useSelector(listingsSelector) // TO-DO: make separate listings selector for featured vehicles
  const onlineDate = moment(user.profile?.onlineAt)
  const onlineHours = Math.abs(onlineDate.diff(moment(), 'hours'))
  const lastOnline =
    onlineHours > 24 ? onlineDate.format('DD.MM.YYYY') : onlineDate.fromNow()

  return (
    <div className={styles.container}>
      <Layout className={styles.layout} background="white">
        <div className={styles.profile}>
          <ProfileAvatar src={user.profile?.image?.url} username={username} />
          <div className={styles.details}>
            <h1>{username}</h1>
            {user.profile?.firstName && user.profile?.lastName && (
              <h6>
                {user.profile?.firstName} {user.profile?.lastName}
                <span>
                  {user.profile?.gender === 'male' && <GiMale />}
                  {user.profile?.gender === 'female' && <GiFemale />}
                </span>
              </h6>
            )}
            {user.profile?.description && (
              <p className={styles.descriptionDesktop}>
                {user.profile?.description}
              </p>
            )}

            {user.profile?.onlineAt && (
              <div
                className={classNames(
                  styles.online,
                  onlineHours < 1
                    ? styles.online
                    : onlineHours < 8
                    ? styles.recent
                    : styles.offline
                )}
              >
                <span>{`Last seen ${lastOnline}`}</span>
                <GiDiamonds />
              </div>
            )}
          </div>
        </div>
        {user.profile?.description && (
          <p className={styles.descriptionMobile}>
            {user.profile?.description}
          </p>
        )}
        {user.profile?.onlineAt && (
          <div
            className={classNames(
              styles.online,
              styles.onlineStatusMobile,
              onlineHours < 1
                ? styles.online
                : onlineHours < 8
                ? styles.recent
                : styles.offline
            )}
          >
            <span>{`Last seen ${lastOnline}`}</span>
            <GiDiamonds />
          </div>
        )}
        <Button
          label="Send a message"
          fluid
          type={Button.types.GHOST}
          className={styles.messageButton}
        />

        <ListingsCarousel
          listings={featuredListings}
          title="Vehicles for sale"
        />
        <ListingsCarousel listings={featuredListings} title="Vehicles sold" />
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  const usersService = new UsersService()
  const response = await usersService.find({
    query: {
      $limit: 50,
      $sort: {
        createdAt: -1,
      },
    },
  })
  const users: UserType[] = response.data
  const paths =
    (users &&
      users.map((user) => ({
        params: { id: user._id },
      }))) ||
    []
  return { paths, fallback: true }
}

export async function getStaticProps({ params }: any) {
  try {
    const usersService = new UsersService()
    const user: UserType[] = await usersService.get(params.id)
    return { props: { prefetchedUser: user } }
  } catch (e) {
    return { props: { prefetchedUser: null } }
  }
}

export default ProfilePage
