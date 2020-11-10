import React from 'react'
import { AuthForm } from '~components'
import { types as formTypes } from '~components/AuthForm/AuthForm'

const SignInPage = () => {
  return (
    <>
      <AuthForm type={formTypes.SIGNIN} />
    </>
  )
}

export default SignInPage
