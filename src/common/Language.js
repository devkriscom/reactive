import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Select from '@atlaskit/select';

type Props = {
    className: string,
    tag: Function | string,
    locale: string,
    locales: array,
    changeLocale: func
}

export const SelectLanguage = ({
  Tag = 'div', className = 'options', locale = 'en', locales = [], changeLocale = (locale) => {}
}) => {

    const classes = classNames('locales', className);

    const options = [];
    locales.map((value, key) => {
        options.push({label: value.code, value: value.code});
    });

    return (
        <Tag className={classes}>
            <Select
                className="single-select"
                classNamePrefix="react-select"
                defaultValue={locale}
                options={options}
                placeholder={locale}
                onChange={changeLocale}
            />
            </Tag>
            );

}
