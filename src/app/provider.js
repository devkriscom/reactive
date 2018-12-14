import React from 'react';
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
import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Modal, { ModalHeader, ModalTransition } from '@atlaskit/modal-dialog';
import Drawer from '@atlaskit/drawer';
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

const ModalView = ({
    isModalOpen, modalView, onClose,
}: Props) => {
    return (
      <ModalTransition>
        {isModalOpen && (
            <Modal
              id="mainmodal" header={({ onClose, showKeyline }: Props) => {
                return (<ModalHeader showKeyline={showKeyline}><Button onClick={onClose}><CrossIcon label="Close Modal" size="small" /></Button></ModalHeader>);
                }} onClose={onClose}
                >
                {React.createElement(modalView)}
                </Modal>
                )
        }
        </ModalTransition>
        );
};

const DrawerView = ({
    isDrawerOpen, drawerView, onClose, onComplete, size = 'wide',
}: Props) => {
    return (
        <Drawer onClose={onClose} onCloseComplete={onComplete} isOpen={isDrawerOpen} width={size}>
            {React.createElement(drawerView)}
            </Drawer>
            );
};

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
        lastModal: null,
        nextModal: false,
        isModalOpen: false,
        lastDrawer: null,
        nextDrawer: false,
        isDrawerOpen: false,
        modalManager: Map(this.props.modals()),
        drawerManager: Map(this.props.drawers()),
    }

    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    componentDidMount() {

        let { modalManager, drawerManager } = this.state;
        const { modals, drawers } = this.context.store;

        const oldModals = modalManager.toObject();
        const newModals = {};
        if(typeof modals === 'object') {
            Object.keys(modals).map(name => {
                const modalData = modals[name];
                const {key, modal, mode} = modalData;
                if(!modalManager.has(name)){
                    newModals[name] = modal;
                }
            })
        }

        const oldDrawers = drawerManager.toObject();
        const newDrawers = {};
        if(typeof drawers === 'object') {
            Object.keys(drawers).map(name => {
                const drawerData = drawers[name];
                const {key, drawer, mode} = drawerData;
                if(!drawerManager.has(name)){
                    newDrawers[name] = drawer;
                }
            })
        }

        this.setState({
            modalManager: Map(merge(oldModals, newModals)),
            drawerManager: Map(merge(oldDrawers, newDrawers))
        })
    }

    static getDerivedStateFromProps(props, state) {
        const {
            nextModalProp, lastModalProp, lastDrawerProp, nextDrawerProp,
        } = props;

        const {
            isModalOpen, lastModal, nextModal, isDrawerOpen, lastDrawer, nextDrawer,
        } = state;

        const states = {};
            /**
             * modals
             */
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

        let {
            isModalOpen, nextModal, modalManager, isDrawerOpen, nextDrawer, drawerManager,
        } = this.state;

        const modalView = this.state.modalManager.get(nextModal);

        if (!modalView) {
            isModalOpen = false;
        }

        let drawerRender = null;
        if (nextDrawer && isDrawerOpen) {
            const drawerView = this.state.drawerManager.get(nextDrawer);
            if (drawerView) {
                drawerRender = (<DrawerView isDrawerOpen={isDrawerOpen} drawerView={drawerView} onClose={() => this.onDrawerClose()} />);
            }
        }

        return (
            <IntlProvider locale={this.props.locale} key={this.props.locale} defaultLocale="en" messages={messages}>
                <div>
                  {drawerRender}
                  <ModalView isModalOpen={isModalOpen} modalView={modalView} onClose={() => this.onClose()} />
                  {React.Children.only(this.props.children)}
              </div>
              </IntlProvider>
              );
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
    ),
)(I18nProvider);
