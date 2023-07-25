import { Configuration, FrontendApi } from '@ory/client'
import { getEnvVar } from '~/utils/env'

let oryInstance :FrontendApi

export function getOryInstance () {
  if (!oryInstance) {
    const basePath = getEnvVar('KRATOS_PUBLIC_URL')

    oryInstance = new FrontendApi(
      new Configuration({
        basePath,
        baseOptions: {
          withCredentials: true
        }
      })
    )
  }

  return oryInstance
}

export async function getSessionToken () {
  const email = getEnvVar('MFI_EMAIL')
  const password = getEnvVar('MFI_PASSWORD')

  const ory = getOryInstance()

  // Create the login flow
  const loginFlow = await ory.createNativeLoginFlow(
    {},
    {

    }
  ).then(res => res.data)

  // Complete the login flow to get the session token
  const completedLoginFlow = await ory.updateLoginFlow({
    flow: loginFlow.id,
    updateLoginFlowBody: {
      identifier: email,
      password,
      method: 'password'
    }
  }).then(res => res.data)

  if (!completedLoginFlow.session_token) {
    throw new Error('Unable to get the session token')
  }

  return completedLoginFlow.session_token
}
