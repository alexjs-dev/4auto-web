import React from 'react'
import { BasicHeader, AuthForm } from '~components'
import { types as formTypes } from '~components/AuthForm/AuthForm'

const SignUpPage = () => {
  return (
    <>
      <AuthForm type={formTypes.FORGOT} />
    </>
  )
}

export default SignUpPage
