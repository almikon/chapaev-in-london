import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    },
  },
    testMatch: [
    "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}"
  ],
  moduleNameMapper: {
    '\\.(css|sass)$' : 'identity-obj-proxy',
    '^nanoid(/(.*)|$)' : 'nanoid$1'
  },
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ]
}