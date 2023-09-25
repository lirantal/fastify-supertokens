import fastifyEnv from '@fastify/env'
import fastifyPlugin from 'fastify-plugin'
import type FastifyEnvOptions from '@fastify/env'

function configPlugin (server, options, done) {
  const schema = {
    type: 'object',
    required: [
      'HTTP_PORT',
      'SUPERTOKENS_CONNECTION_URI',
      'SUPERTOKENS_API_KEY',
      'SUPERTOKENS_APPNAME',
      'SUPERTOKENS_API_DOMAIN',
      'SUPERTOKENS_API_BASE_PATH',
      'SUPERTOKENS_WEBSITE_DOMAIN',
      'SUPERTOKENS_WEBSITE_BASE_PATH',
      'SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_ID',
      'SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_SECRET',
      'SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_ID',
      'SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_SECRET',
      'SUPERTOKENS_3RD_PARTY_APPLE_CLIENT_ID',
      'SUPERTOKENS_3RD_PARTY_APPLE_KEY_ID',
      'SUPERTOKENS_3RD_PARTY_APPLE_PRIVATE_KEY',
      'SUPERTOKENS_3RD_PARTY_APPLE_TEAM_ID',
      'CORS_ORIGIN_URL'
    ],
    properties: {
      HTTP_PORT: {
        type: 'number',
        default: 3001
      },
      HTTP_HOST: {
        type: 'string',
        default: '0.0.0.0'
      },
      SUPERTOKENS_CONNECTION_URI: {
        type: 'string'
      },
      SUPERTOKENS_API_KEY: {
        type: 'string'
      },
      SUPERTOKENS_APPNAME: {
        type: 'string'
      },
      SUPERTOKENS_API_DOMAIN: {
        type: 'string'
      },
      SUPERTOKENS_API_BASE_PATH: {
        type: 'string'
      },
      SUPERTOKENS_WEBSITE_DOMAIN: {
        type: 'string'
      },
      SUPERTOKENS_WEBSITE_BASE_PATH: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_ID: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_GOOGLE_CLIENT_SECRET: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_ID: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_GITHUB_CLIENT_SECRET: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_APPLE_CLIENT_ID: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_APPLE_KEY_ID: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_APPLE_PRIVATE_KEY: {
        type: 'string'
      },
      SUPERTOKENS_3RD_PARTY_APPLE_TEAM_ID: {
        type: 'string'
      },
      CORS_ORIGIN_URL: {
        type: 'string'
      }
    }
  }

  const configOptions: FastifyEnvOptions.FastifyEnvOptions = {
    // decorate the Fastify server instance with `config` key
    // such as `fastify.config('PORT')
    confKey: 'config',
    // schema to validate
    schema,
    // source for the configuration data
    data: process.env,
    // will read .env in root folder
    dotenv: true
  }

  fastifyEnv(server, configOptions, done)
}

export default fastifyPlugin(configPlugin)
