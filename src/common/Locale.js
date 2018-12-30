import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

type Props = {
   Tag: String,
   className: String,
   locale: String,
   locales: Array,
   updateLocale: Function
}

export const Select = ({
    Tag = 'div',
    className = 'options',
    locale = 'en',
    locales = [],
    updateLocale = locale => null,
} : Props) => {
    const fragment = cn('locales', className);

    const options = [];
    locales.map((value, key) => {
        options.push({ label: value.code, value: value.code });
    });
    return (
        <Tag className={fragment}>
            lang
      </Tag>
    );
};
