import React from 'react'
import { AuthForm } from '../../components'
import { types as formTypes } from '../../components/AuthForm/AuthForm'

const SignInPage: React.FunctionComponent = () => {
  return (
    <>
      <AuthForm type={formTypes.SIGNUP} />
    </>
  )
}

export default SignInPage
