import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sidebarCssClasses = [
    'sidebar-show',
    'sidebar-sm-show',
    'sidebar-md-show',
    'sidebar-lg-show',
    'sidebar-xl-show',
];

function toggleClasses(toggleClass, classList, force) {
    const level = classList.indexOf(toggleClass);
    const removeClassList = classList.slice(0, level);
    removeClassList.map(className => document.body.classList.remove(className));
    document.body.classList.toggle(toggleClass, force);
}

const validBreakpoints = ['sm', 'md', 'lg', 'xl'];

function checkBreakpoint(breakpoint, list) {
    return list.indexOf(breakpoint) > -1;
}


const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    display: PropTypes.any,
    mobile: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    type: PropTypes.string,
};

const defaultProps = {
    display: 'lg',
    mobile: false,
    tag: 'button',
    type: 'button',
};

class SidebarToggler extends Component {
    constructor(props) {
        super(props);
        this.sidebarToggle = this.sidebarToggle.bind(this);
    }

    sidebarToggle(e) {
        e.preventDefault();
        this.toggle();
    }

    toggle(force) {
        const [display, mobile] = [this.props.display, this.props.mobile];
        let cssClass = sidebarCssClasses[0];
        if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
            cssClass = `sidebar-${display}-show`;
        }
        toggleClasses(cssClass, sidebarCssClasses, force);
    }

    render() {
        const {
            className, children, tag: Tag, ...attributes
        } = this.props;

        delete attributes.mobile;
        delete attributes.display;

        const classes = classNames(className, 'navbar-toggler');

        return (
          <Tag type="button" className={classes} {...attributes} onClick={event => this.sidebarToggle(event)} data-sidebar-toggler>
              {children || <span className="navbar-toggler-icon" />}
            </Tag>
        );
    }
}

SidebarToggler.propTypes = propTypes;
SidebarToggler.defaultProps = defaultProps;

export default SidebarToggler;
