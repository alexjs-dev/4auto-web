import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import isEmpty from 'lodash/isEmpty'
import classNames from 'classnames'
import moment from 'moment'
import { GiFemale, GiMale, GiDiamonds } from 'react-icons/gi'
import { Loader, Layout, ListingsCarousel } from '../../components'
import UsersService from '../../services/users'
import {
  userAvailableListingsSelector,
  userSoldListingsSelector,
  loadingUserSoldListingsSelector,
  loadingUserAvailableListingsSelector,
} from '../../store/listing/selectors'
import Creators from '../../store/listing/creators'
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
  const dispatch = useDispatch()
  const { id } = router.query
  const { t } = useTranslation()
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

  useEffect(() => {
    if (user._id) {
      dispatch(Creators.fetchUserAvailableListings(user._id))
      dispatch(Creators.fetchUserSoldListings(user._id))
    }
  }, [user])
  const availableListings = useSelector(userAvailableListingsSelector)
  const availableListingsLoading = useSelector(
    loadingUserAvailableListingsSelector
  )
  const soldListings = useSelector(userSoldListingsSelector)
  const soldListingsLoading = useSelector(loadingUserSoldListingsSelector)

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
                <span>{`${t('label.registered')} ${lastOnline}`}</span>
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
            <span>{`${t('label.registered')} ${lastOnline}`}</span>
            <GiDiamonds />
          </div>
        )}
        <ListingsCarousel
          type="CUSTOM"
          listings={availableListings}
          loading={availableListingsLoading}
          title={t('titles.availableVehicles')}
          hideOnEmpty
        />
        <ListingsCarousel
          type="CUSTOM"
          listings={soldListings}
          loading={soldListingsLoading}
          title={t('titles.soldVehicles')}
          hideOnEmpty
        />
        <ListingsCarousel
          type="FEATURED"
          title={t('titles.featuredVehicles')}
        />
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
