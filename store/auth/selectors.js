import { isEmpty } from 'lodash'

export const currentUserSelector = state => state.auth.currentUser
export const isLoggedInSelector = state => !isEmpty(state.auth.currentUser)
export const authLoadingSelector = state => state.auth.loading
