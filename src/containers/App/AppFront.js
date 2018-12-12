import React, { Component, Fragment, Suspense } from 'react';
import { withSaga, withReducer, openModal } from 'app/service';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { DropdownSwitch } from 'components/i18n/SwitchLocale';
import { getConfig, getLocales, getLocale, getMenuByName } from 'app/selectors';
import { changeLocale } from 'app/service';
import { DefaultLayout } from 'components/Layout';
import { FooterWrap } from 'components/Footer';
import { HeaderWrap } from 'components/Header';
import { Navbar } from 'components/Navbar/Navbar';
import logo from 'static/img/logo.svg';

export class App extends React.Component {

    languages = () => {
        return (<DropdownSwitch changeLocale={this.updateLocale} locale={({ label, value }) => {
            this.props.changeLocale(value);
        }} {...this.props} />);
    }

    brand = () => {
        return (<div className="logo"><a href=""><img src={logo} width={40} /></a></div>);
    }

    signinBtn = () => {
        return(<a className="btn _outline mr-15" onClick={() => this.props.openModal('signin')} >Sign In</a>)
    }

    signupBtn = () => {
        return (<a className="btn _outline" onClick={() => this.props.openModal('signup')}>Sign Up</a>)
    }

    render() {
        
        return (<DefaultLayout className="app">
            <HeaderWrap>
                <Navbar items={this.props.main_menu} edges={[this.brand()]} shortcuts={[this.languages(), this.signinBtn(), this.signupBtn()]} />
            </HeaderWrap>
            <div className="app-body">
                <main className="main">
                    {this.props.children}
                </main>
            </div>
            <FooterWrap>
              <span>
                <a href="https://reactive.io">Reactive</a>
                {' '}
                &copy; 2018 ReactiveLabs.
            </span>
        </FooterWrap>
        </DefaultLayout>
        );
    }
}

export default compose(connect(
    createStructuredSelector({
        config: getConfig,
        locales: getLocales,
        locale: getLocale,
        main_menu: getMenuByName('main')
    }),
    (dispatch) => {
        return bindActionCreators({
          openModal,
          changeLocale
      }, dispatch);
    })
)(App);