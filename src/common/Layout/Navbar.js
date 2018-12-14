import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

type Props = {
	className: string
}

export const Navbar = ({
	Tag = 'nav', className = 'navbar', wrapper = 'container-fluid',  items = [], shortcuts = [], edges = []
} : Props) => {

	const classes = classNames(className, 'navbar-expand-lg navbar-light bg-light');

	const container = classNames(wrapper, 'inner');

	return (
		<Tag className={classes}>
			<div className={container}>
				{edges.map((value, key) => (<div key={key}>{value}</div>))}
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						{items.map((value, key) =>	(
							<li className="nav-item" key={key}>
								<a className="nav-link" href={value.path}>{value.label}</a>
								</li>
								)
						)
						}
					</ul>
					{shortcuts.map((value, key) => (<div key={key}>{value}</div>))}
				</div>
			</div>
			</Tag>
			);
};

