import { Component } from "react";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    console.log("error", error);
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    // additional error handling logic - notifications, logs, etc
  }

  render() {
    if (this.state.hasError) {
      return <h3>Something went wrong. Try reloading the page!</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
