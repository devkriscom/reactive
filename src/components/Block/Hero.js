import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';
import './Hero.scss';

type Props = {
    className: string,
    wrapper: string,
    theme: string,
    label: string,
    heading: string,
    content: string,
    image: string,
    link1: string,
    link2: string
}

const Campaign = ({
    className = 'section fullscreen',
    wrapper = 'container',
    theme = 'theme-main',
    label = 'Online Courses',
    heading = 'Professional Online Courses Platform',
    content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image = 'http://www.inventheme.com/themeforest/appway/appway/static/img/zone-3.svg',
    link1 = "#link1",
    link2 = "#link2"
}: Props) => {

    const classes = classNames('campaign-1', className, theme);

    const container = classNames('inner', wrapper);

    return (<React.Fragment>
        <section className={classes}>
            <div className={container}>
                <div className="row align-items-center">
                    <div className="col-md-5">
                        <div className="block-content text-white">
                            <FormattedHTMLMessage id="campaign-1.label" defaultMessage={'{label}'} values={{ label }} tagName="label"/>
                            <FormattedHTMLMessage id="campaign-1.heading" defaultMessage={'{heading}'} values={{ heading }} tagName="h1" />
                            <FormattedHTMLMessage id="campaign-1.content" defaultMessage={'{content}'} values={{ content }} tagName="p" />
                            <div className="btn-group">
                                <FormattedHTMLMessage id="campaign-1.button" defaultMessage={'<a href="{link1}" class="btn _outline">Free Trial</a> <a href="{link2}" class="btn _outline">Learn More</a>'} values={{ link1: link1, link2: link2 }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <img src={image} />
                    </div>
                </div>
            </div>
        </section>
        </React.Fragment>
        );
};


export default Campaign;
