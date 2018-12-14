import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';
import Avatar from '@atlaskit/avatar';
import Comment, { CommentAuthor, CommentTime, CommentAction, CommentEdited } from '@atlaskit/comment';
import { Editor, EditorContext, CollapsedEditor } from '@atlaskit/editor-core';
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
    onLoadMore = () => null
}: Props) => {

    const classes = classNames('comments', className);
    const container = classNames('inner', wrapper);

    return (<React.Fragment>
        <section className={classes}>
            <div className={container}>
                {comments.map((comment, key) => {
                    return( <Comment
                    avatar={<Avatar label="Atlaskit avatar" size="medium" />}
                    author={<CommentAuthor>John Smith</CommentAuthor>}
                    type="author"
                    edited={<CommentEdited>Edited</CommentEdited>}
                    time={<CommentTime>30 August, 2016</CommentTime>}
                    content={<p>The contest proposes a graphic to be used at the Agency, with potential use in presentation materials and Gateway team products. Freelancers will have a role in shaping the visual identity of this exciting project. </p>}
                    actions={[<CommentAction>Reply</CommentAction>,<CommentAction>Edit</CommentAction>, <CommentAction>Like</CommentAction>]}
                />)
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

    const classes = classNames('comment-form', className);
    return (<React.Fragment>
        <section className={classes}>
            <Editor
                isExpanded={true}
            />
        </section>
        </React.Fragment>
        );
};
