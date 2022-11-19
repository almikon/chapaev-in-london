import React from 'react'

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void
type ErrorHandlingComponent<Props> = (props: Props, error?: Error) => React.ReactNode
type ErrorState = { error?: Error }

export const Catch = <Props, >(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler
): React.ComponentType<Props> => {
  function Inner(props: { error?: Error, props: Props }) {
    return <React.Fragment>{component(props.props, props.error)}</React.Fragment>
  }

  return class extends React.Component<Props, ErrorState> {
    state: ErrorState = {
      error: undefined
    }

    static getDerivedStateFromError(error: Error) {
      return { error }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info)
      }
    }

    render() {
      return <Inner error={this.state.error} props={this.props} />
    }
  }
}
