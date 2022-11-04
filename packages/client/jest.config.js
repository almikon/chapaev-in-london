import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/src/**/?(*.)test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy'
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
