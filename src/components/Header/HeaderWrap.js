import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class HeaderWrap extends Component {
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
        const classes = classNames(className, 'app-header', 'page-header');
        return (
          <Tag className={classes} {...attributes}>
              {children}
            </Tag>
        );
    }
}

HeaderWrap.propTypes =  {
    children: PropTypes.node,
    className: PropTypes.string,
    fixed: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

HeaderWrap.defaultProps = {
    tag: 'header',
    fixed: false,
};

export default HeaderWrap;
