import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

type Props = {
   Tag: string,
   className: string
}

export const Image = ({
    Tag = 'img',
    className,
} : Props) => {
    const fragment = cn('image', className);
    return (<Tag className={fragment} />);
};

export const Video = ({
    Tag = 'video',
    className,
} : Props) => {
    const fragment = cn('image', className);
    return (<Tag className={fragment} />);
};

export const Podcast = ({
    Tag = 'div',
    className,
} : Props) => {
    const fragment = cn('podcast', className);
    return (<Tag className={fragment} />);
};
