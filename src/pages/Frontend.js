import React, { Component, Fragment, Suspense } from 'react';
import {
    withConnect, withSaga, withReducer, withDesign, withModal, openModal, changeLocale,
} from 'app/service';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { DefaultLayout } from 'common/Layout/Layout';
import { FooterWrap } from 'common/Layout/Footer';
import { HeaderWrap } from 'common/Layout/Header';
import { Navbar } from 'common/Navbar';
import logo from 'static/img/logo.svg';
import {
    getConfig, getLocales, getLocale, getMenuByName,
} from 'app/selectors';
import SigninModal from 'containers/Auth/LoginModal';


const Header = (props) => {
    return (<Fragment>
        <HeaderWrap>
            <Navbar 
                brand={(<div className="logo"><a href=""><img src={props.logo} width={40} /></a></div>)}
                items={props.menu} 
                edges={[<div />, 
                    <a className="btn _outline mr-15" onClick={() => props.openModal('signin')}>Sign In</a>, 
                    <a className="btn _outline" onClick={() => props.openModal('signup')}>Sign Up</a>
                    ]} 
                />
            </HeaderWrap>
            </Fragment>
            );
}

const MakeHeader = compose(withConnect({
    locales: getLocales,
    locale: getLocale,
    menu: getMenuByName('main'),
}, {
    openModal,
    changeLocale,
}))(Header);

const MakeFooter = () => (<FooterWrap><span><a href="https://reactive.io">Reactive</a>&copy; 2018 ReactiveLabs.</span></FooterWrap>);


export class App extends React.Component {
    render() {
        return (<Fragment>
          {this.props.children}
          </Fragment>);
    }
}

export default compose(withDesign({
    header: <MakeHeader />,
    footer: <MakeFooter />,
}), withModal({
    key: 'signin',
    modal: <SigninModal />,
}), withConnect({
    locales: getLocales,
    locale: getLocale,
}, {
    openModal,
    changeLocale,
}))(App);
