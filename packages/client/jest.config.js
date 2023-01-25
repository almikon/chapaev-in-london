import dotenv from 'dotenv'
dotenv.config()

export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: 'jsdom',
    testMatch: [
    "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}"
  ],
  moduleNameMapper: {
    '\\.(css|sass)$' : 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ]
}