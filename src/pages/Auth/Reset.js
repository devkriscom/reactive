import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withSaga, withReducer } from 'app/service';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import cn from 'classnames';
import Helmet from 'react-helmet';
import Hero from 'components/Block/Hero';

export class Page extends Component {
    render() {
        return (
            <div className={cn('page')}>
                <Helmet title="Page Page" />
            <div>
                  <Hero />
                </div>
          </div>
        );
    }
}


export default compose(connect(
    createStructuredSelector({

    }),
    (dispatch) => {
        return bindActionCreators({

        }, dispatch);
    },
))(Page);
