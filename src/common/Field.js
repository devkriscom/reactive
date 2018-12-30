import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

type Props = {
   Tag: string,
   className: string
}

export const Input = ({
    Tag = 'input',
    className,
} : Props) => {
    const fragment = cn('input', className);
    return (<Tag className={fragment} />);
};

export const Text = ({
    Tag = 'input',
    className,
} : Props) => {
    const fragment = cn('input-text', className);
    return (<Tag className={fragment} />);
};
