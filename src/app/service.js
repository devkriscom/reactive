import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import compose from './compose';

import { CHANGE_LOCALE, MODAL_OPEN, MODAL_CLOSE, DRAWER_OPEN, DRAWER_CLOSE } from './constants';

export function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        locale: locale
    };
}

export function openModal(modal) {
    return {
        type: MODAL_OPEN,
        modal: modal
    };
} 

export function closeModal(modal) {
    return {
        type: MODAL_CLOSE,
        modal: modal
    };
}

export function openDrawer(drawer) {
    return {
        type: DRAWER_OPEN,
        drawer: drawer
    };
}

export function closeDrawer(drawer) {
    return {
        type: DRAWER_CLOSE,
        drawer: drawer
    };
}

export const withModal = ({ key, modal, mode = 'compose' }) => (WrappedComponent) => {

    class RegisterModal extends React.Component {

        static WrappedComponent = WrappedComponent;

        static displayName = `withModal(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
        
        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        composers = compose(this.context.store);

        componentWillMount() {
            const { loadModal } = this.composers;
            loadModal(key, { modal, mode }, this.props);
        }

        componentWillUnmount() {
            const { trimModal } = this.composers;
            trimModal(key);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    return hoistNonReactStatics(RegisterModal, WrappedComponent);
};

export const withDrawer = ({ key, drawer, mode }) => (WrappedComponent) => {

    class RegisterDrawer extends React.Component {

        static WrappedComponent = WrappedComponent;
        static displayName = `withDrawer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        composers = compose(this.context.store);

        componentWillMount() {
            const { loadDrawer } = this.composers;
            loadDrawer(key, { drawer, mode }, this.props);
        }

        componentWillUnmount() {
            const { trimDrawer } = this.composers;
            trimDrawer(key);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    return hoistNonReactStatics(RegisterDrawer, WrappedComponent);
};


export const withSaga = ({ key, saga, mode }) => (WrappedComponent) => {

    class RegisterSaga extends React.Component {
        
        static WrappedComponent = WrappedComponent;

        static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        composers = compose(this.context.store);

        componentWillMount() {
            
            const { loadSaga } = this.composers;

            loadSaga(key, { saga, mode }, this.props);
        }

        componentWillUnmount() {
            const { trimSaga } = this.composers;
            trimSaga(key);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    return hoistNonReactStatics(RegisterSaga, WrappedComponent);
};

export const withReducer = ({ key, reducer }) => (WrappedComponent) => {
    class RegisterReducer extends React.Component {
        static WrappedComponent = WrappedComponent;

        static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        composers = compose(this.context.store);

        componentWillMount() {
            const { loadReducer } = this.composers;
            loadReducer(key, reducer);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    return hoistNonReactStatics(RegisterReducer, WrappedComponent);
};
