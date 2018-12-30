import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import hoistNonReactStatics from 'hoist-non-react-statics';
import compose from './compose';

import {
    CHANGE_LOCALE, MODAL_OPEN, MODAL_CLOSE, DRAWER_OPEN, DRAWER_CLOSE,
} from './constants';

export function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        locale,
    };
}

export function openModal(modal) {
    return {
        type: MODAL_OPEN,
        modal,
    };
}

export function closeModal(modal) {
    return {
        type: MODAL_CLOSE,
        modal,
    };
}

export function openDrawer(drawer) {
    return {
        type: DRAWER_OPEN,
        drawer,
    };
}

export function closeDrawer(drawer) {
    return {
        type: DRAWER_CLOSE,
        drawer,
    };
}

export const withConnect = (selectors, dispachers) => {
    return connect(createStructuredSelector(selectors),
        dispatch => bindActionCreators(dispachers, dispatch));
};

export const withDesign = ({
    header, footer, leftside, rightside,
}) => (WrappedComponent) => {
    class RegisterDesign extends React.Component {
        static WrappedComponent = WrappedComponent;

        static displayName = `withDesign(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        composers = compose(this.context.store);

        componentWillMount() {
            const {
                loadHeader, loadFooter, loadLeftside, loadRightside,
            } = this.composers;
            if (header) {
                loadHeader(header);
            }
            if (footer) {
                loadFooter(footer);
            }
            if (leftside) {
                loadLeftside(leftside);
            }
            if (rightside) {
                loadRightside(rightside);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    return hoistNonReactStatics(RegisterDesign, WrappedComponent);
};

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
            loadModal(key, modal);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    return hoistNonReactStatics(RegisterModal, WrappedComponent);
};

export const withDrawer = ({ key, drawer, mode = 'compose' }) => (WrappedComponent) => {
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
