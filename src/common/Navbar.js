import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

type Props = {
	className: String
}

export const Navbar = ({
    Tag = 'nav', 
    className = 'navbar-expand-lg navbar-light bg-light', 
    classNames = {
        inner: 'container-fluid',
        navbar: 'ml-auto'
    },
    brand = null,
    items = [], 
    edges = [],
    tools = []
} : Props) => {

    const fragment = cn('navbar', className);
    const container = cn('inner', classNames.inner);
    const navbar = cn('navbar-nav', classNames.navbar);

    return (<Fragment>
        <Tag className={fragment}>
            <div className={container}>
                {tools.map((value, key) => (<div key={key}>{value}</div>))}
                {brand}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse">
                    <ul className={navbar}>
                        {items.map((value, key) => (
                            <li className="nav-item" key={key}><a className="nav-link" href={value.path}>{value.label}</a></li>
                                )
                        )}
                    </ul>
                    {edges.map((value, key) => (<div key={key}>{value}</div>))}
                </div>
            </div>
        </Tag>
        </Fragment>
        );
};
