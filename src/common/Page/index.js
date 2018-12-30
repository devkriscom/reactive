import './style.scss';
import React, { Fragment } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Helmet from 'react-helmet';
import cn from 'classnames';

export const Header = ({
    Tag = 'header',
    className = 'page-header',
    classNames = {
        inner: 'container',
    },
    data = {
        title: '',
        meta: '',
    },
}: {}) => {
    const fragmentName = cn('header', className);
    const innerName = cn('inner', classNames.inner);
    return (<Fragment>
        <Helmet title={data.title} />
        <Tag className={fragmentName}>
            <div className={innerName}>
                <h1 className="title">{data.title}</h1>
                <div className="meta">{data.meta}</div>
                <div className="breadcrumb" />
            </div>
        </Tag>
        </Fragment>
        );
};

export const Article = ({
    Tag = 'article',
    className = 'post-article',
    classNames = {
        inner: 'container',
    },
    content = '',
}: { }) => {
    const fragmentName = cn('article', className);
    const innerName = cn('inner', classNames.inner);
    return (<Fragment>
        <Tag className={fragmentName}>
            <div
                className={innerName}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </Tag>
        </Fragment>
        );
};


export const Main = ({
    Tag = 'main',
    className,
    classNames = {
        inner: 'container',
    }, 
    children
}: { }) => {
    const fragmentName = cn('app-main', className);
    const innerName = cn('inner', classNames.inner);
    return (<Fragment>
        <Tag className={fragmentName}>
            <div className={innerName}>
                {children}
            </div>
        </Tag>
        </Fragment>
        );
};

export const Widget = ({
    Tag = 'div',
    className,
    classNames = {}, 
    title,
    children
}: {}) => {
    const fragmentNameName = cn('widget', className);
    const innerName = cn('inner', classNames.inner);
    const titleName = cn('widget-title', classNames.title);
    return (<Fragment>
        <Tag className={fragmentNameName}>
            <h6 className={titleName}>{title}</h6>
            <div className={innerName}>
                {children}
            </div>
        </Tag>
        </Fragment>
        );
};
