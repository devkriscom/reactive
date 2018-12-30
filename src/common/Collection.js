import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';
import isFunction from 'lodash/isFunction';


type PaginateStates = { }
type PaginateProps = {}
export const Paginate = ({ pages = [1], onChange } : PaginateProps, { onChangeEvent: any }: PaginateStates) => {
	return (<div>pagination</div>);
};


export const CollectionView = ({
	className = '', items = [], template, fragmentName, toolbars = [],
} : {
	className: string
}) => {
	return (<div className={cn('collection', className)} >{items.map((item, key) => <div className={fragmentName} key={key}>{React.createElement(template, { ...item })}</div>)}</div>);
};



export const Toolbar = ({ 
	templates = [], 
	edges = [], 
	onChangeView = () => null 
} : {}) => {
	let views = '';
	if (Object.keys(templates).length > 1) {
		views = Object.keys(templates).map((key) => {
			const template = templates[key];
			return (<button onClick={() => onChangeView(key)} key={key}>{template.icon}</button>);
		});
	}
	return (<Fragment>
		<div className="toolbar">
			<div className="view">{views}</div>
			{edges.map((edge, key) => edge)}
		</div>
		</Fragment>);
};


export class Collection extends React.PureComponent<{
	className: string,
	template: string,
	templates: Array<any>,
	items: Array<any>,
	loading: boolean,
	placeholder: any,
	toolbar: Object,
	pagination: Object
}> {

	state = {
		template: 'default',
		component: null,
		fragmentName: null,
	}

	static defaultProps = {
		toolbar: Toolbar,
		pagination: Paginate,
		loading: false,
	}

	static getDerivedStateFromProps(props, state) {

		const { templates, template } = props;

		let activeTemplate = 'default';

		if (template) {
			activeTemplate = template;
		}

		if (typeof undefined !== templates[activeTemplate]) {
			return {
				component: state.component ? state.component : templates[activeTemplate].component,
				fragmentName: state.fragmentName ? state.fragmentName : templates[activeTemplate].className,
			};
		}

		return null;
	}

	onChangeView = (view) => {
		const { templates } = this.props;
		if (typeof undefined !== templates[view]) {
			this.setState({
				component: templates[view].component,
				fragmentName: templates[view].className,
			});
			this.forceUpdate();
		}
	}

	render() {
		const {
			items, 
			className, 
			templates, 
			pagination, 
			toolbar, 
			loading, 
			placeholder
		} = this.props;
		const { component, fragmentName } = this.state;
		return (<Fragment>
			{React.createElement(toolbar, { ...this.props, onChangeView: this.onChangeView })}
			{(
				() => {
					if (loading && placeholder) {
						return React.createElement(placeholder, { ...this.props });
					}
					return (<CollectionView items={items} template={component} fragmentName={fragmentName} className={className} />);
				})
			()}
			{(
				() => {
					if (pagination) {
						return React.createElement(pagination, { ...this.props });
					}
				})
			()}
			</Fragment>);
	}
}

