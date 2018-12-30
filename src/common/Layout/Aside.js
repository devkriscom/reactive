import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Aside.scss';

const sidebarCssClasses = [
    'sidebar-show',
    'sidebar-sm-show',
    'sidebar-md-show',
    'sidebar-lg-show',
    'sidebar-xl-show',
];

const asideMenuCssClasses = [
    'aside-menu-show',
    'aside-menu-sm-show',
    'aside-menu-md-show',
    'aside-menu-lg-show',
    'aside-menu-xl-show',
];

const validBreakpoints = ['sm', 'md', 'lg', 'xl'];

function checkBreakpoint(breakpoint, list) {
    return list.indexOf(breakpoint) > -1;
}

function toggleClasses(toggleClass, classList, force) {
    const level = classList.indexOf(toggleClass);
    const removeClassList = classList.slice(0, level);
    removeClassList.map(className => document.body.classList.remove(className));
    document.body.classList.toggle(toggleClass, force);
}


class AsideWrap extends Component {
    constructor(props) {
        super(props);

        this.isFixed = this.isFixed.bind(this);
        this.isOffCanvas = this.isOffCanvas.bind(this);
        this.displayBreakpoint = this.displayBreakpoint.bind(this);
    }

    componentDidMount() {
        this.isFixed(this.props.fixed);
        this.isOffCanvas(this.props.offCanvas);
        this.displayBreakpoint(this.props.display);
    }

    isFixed(fixed) {
        if (fixed) { document.body.classList.add('aside-menu-fixed'); }
    }

    isOffCanvas(offCanvas) {
        if (offCanvas) { document.body.classList.add('aside-menu-off-canvas'); }
    }

    displayBreakpoint(display) {
        if (display && checkBreakpoint(display, validBreakpoints)) {
            const cssClass = `aside-menu-${display}-show`;
            toggleClasses(cssClass, asideMenuCssClasses, true);
        }
    }

    render() {
        const {
            className, children, tag: Tag, ...attributes
        } = this.props;

        delete attributes.display;
        delete attributes.fixed;
        delete attributes.offCanvas;
        delete attributes.isOpen;

        const fragment = cn(className, 'aside-menu');

        return (
          <Tag {...attributes} className={fragment}>
              {children}
            </Tag>
        );
    }
}

AsideWrap.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    display: PropTypes.string,
    fixed: PropTypes.bool,
    isOpen: PropTypes.bool,
    offCanvas: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};


AsideWrap.defaultProps = {
    tag: 'aside',
    display: '',
    fixed: false,
    isOpen: false,
    offCanvas: true,
};

export default AsideWrap;
