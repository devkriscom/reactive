import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Footer.scss';


export class FooterWrap extends Component {
    static defaultProps = {
        tag: 'footer',
        fixed: false,
    }

    constructor(props) {
        super(props);

        this.isFixed = this.isFixed.bind(this);
    }

    componentDidMount() {
        this.isFixed(this.props.fixed);
    }

    isFixed(fixed) {
        if (fixed) { document.body.classList.add('footer-fixed'); }
    }

    render() {
        const {
            className, children, tag: Tag, ...attributes
        } = this.props;

        delete attributes.fixed;

        const fragment = cn(className, 'app-footer');

        return (
          <Tag className={fragment} {...attributes}>
              {children}
            </Tag>
        );
    }
}
