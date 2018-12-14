import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

type Props = {
}
export const PageHeader = ({
    className = '',
    wrapper,
    title = '',
    meta = '',
    crumbs = []
}: Props) => {

    const classes = classNames('page-header', className);
    const container = classNames('container', wrapper);

    return (<React.Fragment>
        <Helmet title={title} />
        <div className={classes}>
            <div className={container}>
                <h1 className="title">{title}</h1>
                <div className="meta">{meta}</div>
                <div className="breadcrumb">
                    <BreadcrumbsStateless>
                        <BreadcrumbsItem href="/pages" text="Outerspace" />
                        <BreadcrumbsItem href="/pages/home" text="News" />
                        <BreadcrumbsItem
                            href="/item"
                            text="Exploration"
                        />
                        <BreadcrumbsItem
                            href="/item"
                            text="A new NASA contest for the next generation of space exploration"
                        />
                    </BreadcrumbsStateless>
                </div>
            </div>
        </div>
        </React.Fragment>
        );
};