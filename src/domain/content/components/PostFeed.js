import './PostFeed.scss';
import React, { Fragment } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';
import EditorFeedbackIcon from '@atlaskit/icon/glyph/editor/feedback';

type Props = {
  className: string,
  innerClass: string,
  theme: string,
  category: string,
  title: string,
  content: string,
  image: string,
  link1: string,
  link2: string
}

export const PostFeed = ({
  Tag = 'article',
  className = 'section fullscreen',
  innerClass = 'container',
  theme,
  category = 'Online Courses',
  title = 'We relocated our office to a new garage',
  content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  image = 'http://thetheme.io/thesaas/assets/img/thumb/1.jpg',
  link = "#link1"
}: Props) => {

  const classes = classNames('post-feed', className, theme);
  const wrapper = classNames('inner', innerClass);

  return(<Fragment>
    <Tag className={classes}>
        <header className="header">
            <a className="category" href={link}>{category}</a>
            <h3 className="title"><a href={link}>{title}</a></h3>
        </header>
        <figure className="cover">
            <img className="rounded-md" src={image} />
        </figure>
        <div className="meta">
            <FormattedMessage  id="by" />
            <a className="author" href="#">Hossein</a>
            <time dateTime="2018-05-15T19:00">3 days ago</time>
            <a className="comments ml-5" href={link}><EditorFeedbackIcon size="medium"/> 6</a>
        </div>
        <summary className="summary">
            <p>{content} <a className="read_more" href={link}><FormattedMessage id="more" /></a></p>
        </summary>
    </Tag>
    </Fragment>
    );
};
