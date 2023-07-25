import { getEnvVar } from '~/utils/env'
import { getSessionToken } from '~/server/utils/ory'

export default defineEventHandler(async () => {
  const apiKey = getEnvVar('MFI_API_KEY')
  const apiBaseUrl = getEnvVar('MFI_API_BASE_URL')

  const sessionToken = await getSessionToken()

  const movies = await fetch(`${apiBaseUrl}/items/movies`, {
    headers: {
      'api-key': apiKey,
      'X-Session-Token': sessionToken
    }
  }).then(res => res.json()).then(res => res.data)

  return movies
})
