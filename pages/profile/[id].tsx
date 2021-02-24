import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import isEmpty from 'lodash/isEmpty'
import { Loader, Layout } from '../../components'
import UsersService from '../../services/users'
import {
  currentUserSelector,
  currentUserLoadingSelector,
} from '../../store/user/selectors'
import UserType from '../../types/user'
import styles from './profile.module.scss'
import useFindUser from './hooks/useFindUser'

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
  if ((loading && isEmpty(prefetchedUser)) || isEmpty(user)) {
    return (
      <div className={styles.container}>
        <Loader centered loading isBranded fullscreen />
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <Layout className={styles.layout} background="white">
        <p>{JSON.stringify(user, null, 4)}</p>
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
