import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

type FilterProps = {
	className: string,
	onChange: Function,
	fields: Array<any>,
	actions: Array
}

export const Form = ({
	Tag = 'form', 
	className, 
	classNames = {
		actions: null,
		fields: null
	},
	fields = [], 
	actions = [], 
	onChange = () => null,
}: FilterProps) => {
	const fragmentName = cn('form', className);
	const fieldsName = cn('fields', classNames.fields);
	const actionsName = cn('actions', classNames.actions);
	return (<Fragment>
		<Tag className={fragmentName} onChange={onChange}>
			<div className={fieldsName}>
				{fields.map((field, key) => <Fragment key={key}>{field}</Fragment>)}
			</div>
			<div className={actionsName}>
				{actions.map((action, key) => <Fragment key={key}>{action}</Fragment>)}
			</div>
		</Tag>
		</Fragment>
		);
};
