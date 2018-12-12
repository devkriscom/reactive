import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const defaultProps = {
    tag: 'div',
};

class SidebarFooter extends Component {
    render() {
        const {
            className, children, tag: Tag, ...attributes
        } = this.props;

        const classes = classNames(className, 'sidebar-footer');
        const footer = children
            ? (
              <Tag className={classes} {...attributes}>
                  {children}
                </Tag>
            )
            : null;

        return (
            footer
        );
    }
}

SidebarFooter.propTypes = propTypes;
SidebarFooter.defaultProps = defaultProps;

export default SidebarFooter;
