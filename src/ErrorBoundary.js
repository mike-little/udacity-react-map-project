import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <div>
                      <h1>Something went wrong.</h1>
                      <p>Sorry we encountered a problem, please try again.  If the problem persists contact the support team.</p>
                    </div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;