import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import cn from 'classnames';
import './Comment.scss';

type Props = {
    className: string,
    wrapper: string,
    comments: Array,
    comment_form: string
}

export const CommentList = ({
    className = '',
    wrapper,
    user,
    comments = [],
    onLiked = () => null,
    onReplay = () => null,
    onDelete = () => null,
    onRefresh = () => null,
    onLoadMore = () => null,
}: Props) => {
    const fragment = cn('comments', className);
    const container = cn('inner', wrapper);

    return (<React.Fragment>
        <section className={fragment}>
        <div className={container}>
                {comments.map((comment, key) => {
                    return (<div>sdfd</div>);
                })}

          </div>
      </section>
            </React.Fragment>
    );
};


type FormProps = {
    className: string,
    user: Object,
    onSave: Function
}

export const CommentForm = ({
    className,
    wrapper,
    onUpdate = () => null,
    onSave = () => null,
}: Props) => {
    const fragment = cn('comment-form', className);
    return (<React.Fragment>
        <section className={fragment}>
           editor
      </section>
            </React.Fragment>
    );
};
