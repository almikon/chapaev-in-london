import React, { Component, ErrorInfo, ReactNode, Fragment, ComponentType } from 'react'

type ErrorHandler = (error: Error, info: ErrorInfo) => void
type ErrorHandlingComponent<Props> = (props: Props, error?: Error) => ReactNode
type ErrorState = { error?: Error }

export const Catch = <Props, >(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler
): ComponentType<Props> => {
  function Inner(props: { error?: Error, props: Props }) {
    return <Fragment>{component(props.props, props.error)}</Fragment>
  }

  return class extends Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined
    }

    static getDerivedStateFromError(error: Error) {
      return { error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info)
      }
    }

    render() {
      return <Inner error={this.state.error} props={this.props} />
    }
  }
}
