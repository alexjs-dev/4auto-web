import React from 'react'
import { Layout } from '~/components'
import styles from './create.module.scss'

const CreateListingPage: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <h1>Create listing </h1>
      </Layout>
    </div>
  )
}

export default CreateListingPage
