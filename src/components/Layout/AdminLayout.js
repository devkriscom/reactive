import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './AdminLayout.scss';

class AdminLayout extends Component {
    render() {
        const { className, children } = this.props;
        const classes = classNames(className, 'layout', 'admin-layout');
        return (
          <div className={classes}>
              {children}
            </div>
        );
    }
}

export default DefaultLayout;