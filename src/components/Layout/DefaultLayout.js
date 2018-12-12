import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './DefaultLayout.scss';

class DefaultLayout extends Component {
    render() {
        const { className, children } = this.props;
        const classes = classNames(className, 'layout', 'default-layout');
        return (
          <div className={classes}>
              {children}
            </div>
        );
    }
}

export default DefaultLayout;
