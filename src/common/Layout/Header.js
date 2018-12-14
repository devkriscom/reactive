import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Header.scss';



export class HeaderWrap extends Component {

    static defaultProps = {
        tag: 'header',
        fixed: false,
    }
    componentDidMount() {
        this.isFixed(this.props.fixed);
    }

    isFixed(fixed) {
        if (fixed) { document.body.classList.add('header-fixed'); }
    }

    render() {
        const {
            className, children, tag: Tag, ...attributes
        } = this.props;
        delete attributes.fixed;
        const classes = classNames(className, 'app-header');
        return (
          <Tag className={classes} {...attributes}>
              {children}
              </Tag>
              );
    }
}




