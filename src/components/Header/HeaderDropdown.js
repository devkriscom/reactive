import React, { Component } from 'react';
import PropTypes from 'prop-types';


class HeaderDropdown extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    render() {
        const { children, ...attributes } = this.props;
        return (
          <div>test</div>
        );
    }
}

HeaderDropdown.propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
};
;
HeaderDropdown.defaultProps = {
    direction: 'down',
};


export default HeaderDropdown;
