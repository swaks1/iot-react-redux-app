import React from 'react';
import LoadingOverlay from 'react-loading-overlay';


class LoaderOverlay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <LoadingOverlay
                active={this.props.isLoading}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '5px'
                    })
                }}
                spinner
                text='Loading...'
            >
                {this.props.children}
            </LoadingOverlay>
        );
    }
}

export default LoaderOverlay;
