import React from 'react'
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import { Layout } from '~/components'
import Steppers from './components/Steppers'
import withAuth from '../../hocs/withAuth'
import { useRouter } from 'next/router'
import useFetchVehicleModels from '../../hooks/useFetchVehicleModels'
import CreateListingForm from './components/form/CreateListingForm'

import styles from './create.module.scss'

const CreateListingPage: React.FunctionComponent = () => {
  const router = useRouter()
  useFetchVehicleModels('createListingGeneralForm')
  const { query } = router
  const step = toNumber(get(query, 'step')) || 1
  const onSetStep = (n: number) => {
    router.push({
      pathname: '/create-listing',
      query: { step: n.toString() },
    })
  }
  return (
    <div className={styles.container}>
      <Layout background="white">
        <Steppers steps={3} currentStep={step} setStep={onSetStep} />
        <CreateListingForm step={step} setStep={onSetStep} />
      </Layout>
    </div>
  )
}

export default withAuth(CreateListingPage)
