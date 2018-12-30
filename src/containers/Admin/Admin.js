import React, { Component, Fragment, Suspense } from 'react';
import {
    withSaga, withReducer, openModal, changeLocale,
} from 'app/service';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { SelectLanguage } from 'common/Language';
import { DefaultLayout } from 'common/Layout/Layout';
import { FooterWrap } from 'common/Layout/Footer';
import { HeaderWrap } from 'common/Layout/Header';
import { Navbar } from 'common/Layout/Navbar';
import logo from 'static/img/logo.svg';
import {
    getConfig, getLocales, getLocale, getMenuByName,
} from 'app/selectors';
import Layout from './Layout';

export class App extends React.Component {
    languages = () => {
        return (
          <SelectLanguage
              changeLocale={this.updateLocale} locale={({ label, value }) => {
                    this.props.changeLocale(value);
                }} {...this.props}
            />
        );
    }

    brand = () => {
        return (<div className="logo"><a href=""><img src={logo} width={40} /></a></div>);
    }

    signinBtn = () => {
        return (<a className="btn _outline mr-15" onClick={() => this.props.openModal('signin')}>Sign In</a>);
    }

    signupBtn = () => {
        return (<a className="btn _outline" onClick={() => this.props.openModal('signup')}>Sign Up</a>);
    }

    render() {
        return (
            <Layout>
            <DefaultLayout>
                  <main className="app-main">
                        {this.props.children}
                    </main>
                </DefaultLayout>
          </Layout>
        );
    }
}

export default compose(connect(
    createStructuredSelector({
        config: getConfig,
        locales: getLocales,
        locale: getLocale,
        main_menu: getMenuByName('main'),
    }),
    dispatch => bindActionCreators({
        openModal,
        changeLocale,
    }, dispatch),
))(App);
