import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Layout.scss';

export class DefaultLayout extends Component {
    render() {
        const { className, children } = this.props;
        const fragment = cn(className, 'layout', 'default-layout');
        return (
          <div className={fragment}>
              {children}
            </div>
        );
    }
}

export default DefaultLayout;
