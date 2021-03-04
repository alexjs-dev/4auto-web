import React from 'react'
import { Layout } from '~/components'
import Steppers from './components/Steppers'
import styles from './create.module.scss'

const CreateListingPage: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Steppers steps={3} currentStep={1} />
        <h1>Create listing </h1>
      </Layout>
    </div>
  )
}

export default CreateListingPage
