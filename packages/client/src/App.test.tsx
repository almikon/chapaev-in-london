import { render, screen } from '@testing-library/react'
import { SignIn } from './pages/SignIn/SignIn'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('form should be rendered in Sign in component', async () => {
  const {container} = render(<SignIn />)
  expect(container.querySelector('form')).toBeTruthy()
})
