import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withSaga, withReducer } from 'app/service';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames';

type Props = {}

export class LoginModal extends Component<Props> {

	render() {
		return (<div>modal test</div>);
	}
}

export default compose(
)(LoginModal);