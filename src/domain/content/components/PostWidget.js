import './PostWidget.scss';
import React, { Fragment } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';
type Props = {
  className: string,
  posts: array
}

export const PostList = ({
  className = '',
  posts = []
}: Props) => {

  const classes = classNames('post-list', className);
  return(<Fragment>
    <div className={classes}>
      {posts.map(function(post, key) {
        return(
          <div className="item" key={key}>
            <a className="list-item" href="#">
              <figure className="thumbnail"><img className="rounded w-65px mr-4" src="http://thetheme.io/thesaas/assets/img/thumb/2.jpg" /></figure>
              <p className="media-body small-2 lh-4 mb-0">Top 5 brilliant content marketing strategies</p>
            </a>
            </div>)
        })}
    </div>
    </Fragment>
    );
};
