/**
 * Returns a new React component, ready to be instantiated.
 * Note the closure here protecting Component, and providing a unique
 * instance of Component to the static implementation of `load`.
 */
export function generateAsyncRouteComponent({ loader, Placeholder }) {
  let Component = null

  return class AsyncRouteComponent extends React.Component {
    constructor() {
      super()
      this.updateState = this.updateState.bind(this)
      this.state = {
        Component,
      }
    }

    componentWillMount() {
      AsyncRouteComponent.load().then(this.updateState)
    }

    updateState() {
      // Only update state if we don't already have a reference to the
      // component, this prevent unnecessary renders.
      if (this.state.Component !== Component) {
        this.setState({
          Component,
        })
      }
    }

    /**
     * Static so that you can call load against an uninstantiated version of
     * this component. This should only be called one time outside of the
     * normal render path.
    */
    static load() {
      return loader().then((ResolvedComponent) => {
        Component = ResolvedComponent.default || ResolvedComponent
      })
    }

    render() {
      const { Component: ComponentFromState } = this.state
      if (ComponentFromState) {
        return <ComponentFromState {...this.props} />
      }
      if (Placeholder) {
        return <Placeholder {...this.props} />
      }
      return null
    }
  }
}
