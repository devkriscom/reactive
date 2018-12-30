import React, { Fragment } from 'react';
import merge from 'merge';
import PropTypes from 'prop-types';
import { fromJS, List, Map } from 'immutable';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { defaultsDeep } from 'lodash';
import { createStructuredSelector } from 'reselect';
import invariant from 'invariant';
import {
    getLocale, getNextModal, getLastModal, getNextDrawer, getLastDrawer,
} from './selectors';

type Props = {
    children: React.element,
    locale: string,
    messages: object,
    onClose: Function,
    showKeyline: boolean
}


export class I18nProvider extends React.Component<Props> {
    static defaultProps = {
        messages: {},
        drawers: {},
        modals: {},
        lastModalProp: null,
        nextModalProp: null,
        lastDrawerProp: null,
        nextDrawerProp: null,
    }

    state = {
        design: null,
        lastModal: null,
        nextModal: false,
        isModalOpen: false,
        lastDrawer: null,
        nextDrawer: false,
        isDrawerOpen: false,
        design: this.context.store.design,
        modal: this.context.store.modal,
        drawer: this.context.store.drawer,
    }

    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const { design, modal, drawer } = this.context.store;
        this.setState({
            design,
            modal,
            drawer,
        });
    }

    static getDerivedStateFromProps(props, state) {
        const {
            nextModalProp, lastModalProp, lastDrawerProp, nextDrawerProp,
        } = props;

        const {
            isModalOpen, lastModal, nextModal, isDrawerOpen, lastDrawer, nextDrawer,
        } = state;

        const states = {};

        if (nextModalProp && !isModalOpen) {
            states.nextModal = nextModalProp;
            states.isModalOpen = true;
            if (lastModalProp) {
                states.lastModal = lastModalProp;
            }
        } else {
            states.isModalOpen = false;
            states.lastModal = null;
            states.nextModal = null;
        }

        if (nextDrawerProp && !isDrawerOpen) {
            states.nextDrawer = nextDrawerProp;
            states.isDrawerOpen = true;
            if (lastDrawerProp) {
                states.lastDrawer = lastDrawerProp;
            }
        } else {
            states.isDrawerOpen = false;
            states.lastDrawer = null;
            states.nextDrawer = null;
        }

        return states;
    }

    onClose() {
        this.setState({
            nextModal: false,
            lastModal: false,
        });
    }

    onDrawerClose() {
        this.setState({
            nextDrawer: false,
            lastDrawer: false,
        });
    }

    render() {
        const messages = defaultsDeep(this.props.messages[this.props.locale], this.props.messages.en);

        const {
            isModalOpen, nextModal, isDrawerOpen, nextDrawer,
        } = this.state;


        const { design } = this.state;
        const Header = design.get('header');
        const Footer = design.get('footer');
        const Leftside = design.get('leftside');
        const Rightside = design.get('rightside');
        return (<IntlProvider locale={this.props.locale} key={this.props.locale} defaultLocale="en" messages={messages}>
            <Fragment>
                {Leftside}
                <div className="app">
                    {Header}
                    {React.Children.only(this.props.children)}
                    {Footer}
                </div>
                {Rightside}
            </Fragment>
            </IntlProvider>);
    }
}

export default compose(connect(
    createStructuredSelector({
        nextModalProp: getNextModal,
        lastModalProp: getLastModal,
        nextDrawerProp: getNextDrawer,
        lastDrawerProp: getLastDrawer,
        locale: getLocale,
    }),
    ))(I18nProvider);
