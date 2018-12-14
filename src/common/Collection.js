import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import Pagination from '@atlaskit/pagination';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import ListIcon from '@atlaskit/icon/glyph/list';
import MediaServicesGridIcon from '@atlaskit/icon/glyph/media-services/grid';
import Form, { FormHeader, FormSection, FormFooter, Field, FieldGroup } from '@atlaskit/form';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import { RadioGroup } from '@atlaskit/radio';
import FieldTextArea from '@atlaskit/field-text-area';
import SearchIcon from '@atlaskit/icon/glyph/search';

type FilterProps = {
	className: string,
	onChange: Function,
	fields: Array<Field|FieldGroup|any>,
	buttons: Array
}

export const Filter = ({className, fields = [], buttons = [], onChange = () => null}: FilterProps) =>
{
	return(
		<div className={classNames('filter', className)}>
			<Form onChange={onChange}>
				{fields.map((field, key) => <div className="filter" key={key}>{field}</div>)}
				<div className="actions">
					{buttons.map((btn, key) => <div className="action" key={key}>{btn}</div>)}
				</div>
			</Form>
			</div>
			)

}

type PaginateStates = { }
type PaginateProps = {}
export const Paginate = ({pages = [1], onChange} : PaginateProps, { onChangeEvent: any }: PaginateStates) => {
	return(<Pagination pages={pages} onChange={(event: SyntheticEvent<>, newPage: any) => onChange(event, newPage)} />)
}

type CollectionProps = {
	className: string
}
export const CollectionView = ({ className = '', items = [], template, classes, toolbars = [] } : CollectionProps) => {
	return (<div className={classNames('collection', className)}>{items.map((item, key) => <div className={classes} key={key} >{React.createElement(template, {...item})}</div>)}</div>);
};

type ToolbarProps = {}
export const Toolbar = ({templates = [], edges = [], onChangeView = (key) => console.log(key)} : ToolbarProps) => {
	let views = '';
	if(Object.keys(templates).length > 1)  {
		views = Object.keys(templates).map(key => {
			const template = templates[key];
			return (<button onClick={() => onChangeView(key)} key={key}>{template.icon}</button>)
		});
	}
	return (<div className="toolbar"><div className="view">{views}</div>{edges.map((edge, key) => edge)}</div>);
}

type Props = {
	className: string,
	template: string,
	templates: Array<any>,
	items: Array<any>,
	loading: boolean,
	placeholder: any,
	toolbar: Object,
	pagination: Object
}

export class Collection extends React.PureComponent<Props> {

	state = {
		template: 'default',
		component: null,
		classes: null
	}

	static defaultProps = {
		toolbar: Toolbar,
		pagination: Paginate,
		loading: false
	}

	static getDerivedStateFromProps(props, state) {

		const { templates, template } = props;

		let activeTemplate = 'default';

		if(template) {
			activeTemplate = template;
		}

		if(typeof undefined !== templates[activeTemplate]) {
			return {
				component: state.component ? state.component : templates[activeTemplate]['component'],
				classes: state.classes ? state.classes : templates[activeTemplate]['className']
			}
		}

		return null;
	}

	onChangeView = (view) => {
		const { templates } = this.props;
		if(typeof undefined !== templates[view]) {
			this.setState({
				component: templates[view]['component'],
				classes: templates[view]['className']
			})
			this.forceUpdate();
		}
	}

	render() {
		const { items, className, templates, pagination, toolbar, loading, placeholder } = this.props;
		const { component, classes } = this.state;
		return(<div>
			{React.createElement(toolbar, {...this.props, onChangeView: this.onChangeView})}
			{(() => {
				if(loading && placeholder){
					return React.createElement(placeholder);
				} else {
					return (<CollectionView items={items} template={component} classes={classes} className={className} />)
				}
			})
			()}
			{(() => {
				if(pagination){
					return React.createElement(pagination, {...this.props});
				} 
			})
			()}
			</div>
			)
	}

}

export default CollectionView;