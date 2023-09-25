import cors from '@fastify/cors'
import formDataPlugin from '@fastify/formbody'
import helmet from '@fastify/helmet'
import fastifyPlugin from 'fastify-plugin'

import supertokens from 'supertokens-node'
import Session from 'supertokens-node/recipe/session/index.js'
import Dashboard from 'supertokens-node/recipe/dashboard/index.js'

import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword/index.js'
import {
  plugin,
  errorHandler
} from 'supertokens-node/framework/fastify/index.js'
import { type TypeInput } from 'supertokens-node/types'

async function auth (server, options) {
  const config = {
    framework: 'fastify',
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: server.config.SUPERTOKENS_CONNECTION_URI,
      apiKey: server.config.SUPERTOKENS_API_KEY
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/session/appinfo
      appName: server.config.SUPERTOKENS_APPNAME,
      apiDomain: server.config.SUPERTOKENS_API_DOMAIN,
      websiteDomain: server.config.SUPERTOKENS_WEBSITE_DOMAIN,
      apiBasePath: server.config.SUPERTOKENS_API_BASE_PATH,
      websiteBasePath: server.config.SUPERTOKENS_WEBSITE_BASE_PATH
    },
    recipeList: [
      ThirdPartyEmailPassword.init({
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          {
            config: {
              thirdPartyId: 'google',
              clients: [
                {
                  clientId: server.config.SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_ID,
                  clientSecret: server.config.SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_SECRET
                }
              ]
            }
          },
          {
            config: {
              thirdPartyId: 'github',
              clients: [
                {
                  clientId: server.config.SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_ID,
                  clientSecret: server.config.SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_SECRET
                }
              ]
            }
          },
          {
            config: {
              thirdPartyId: 'apple',
              clients: [
                {
                  clientId: server.config.SUPERTOKENS_3RD_PARTY_APPLE_CLIENT_ID,
                  additionalConfig: {
                    keyId: server.config.SUPERTOKENS_3RD_PARTY_APPLE_KEY_ID,
                    privateKey: server.config.SUPERTOKENS_3RD_PARTY_APPLE_PRIVATE_KEY,
                    teamId: server.config.SUPERTOKENS_3RD_PARTY_APPLE_TEAM_ID
                  }
                }
              ]
            }
          }
        ]
      }),
      Session.init(),
      Dashboard.init({
        admins: [
          'me@test.com'
        ]
      })
    ]
  }

  server.register(helmet, { contentSecurityPolicy: false })

  supertokens.init(config as TypeInput)

  // we register a CORS route to allow requests from the frontend
  server.register(cors, {
    origin: server.config.CORS_ORIGIN_URL,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
  })
  server.register(formDataPlugin)

  server.register(plugin)

  server.setErrorHandler(errorHandler())
}

export default fastifyPlugin(auth)
