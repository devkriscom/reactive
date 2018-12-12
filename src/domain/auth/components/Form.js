import React, { Fragment } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';

type Props = {
    className: string,
    innerClass: string,
    theme: string,
    label: string,
    heading: string,
    content: string,
    image: string,
    link1: string,
    link2: string
}

export const SigninForm = ({
    Tag = 'article',
    className = 'section fullscreen',
    innerClass = 'container',
    theme = 'theme-main',
    label = 'Online Courses',
    heading = 'Professional Online Courses Platform',
    content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image = 'http://www.inventheme.com/themeforest/appway/appway/static/img/zone-3.svg',
    link1 = "#link1",
    link2 = "#link2"
}: Props) => {

    const classes = classNames('post', className, theme);

    const wrapper = classNames('inner', innerClass);

    return (
        <Fragment>
            <Tag className={classes}>
                <header className="header text-center">
                  <p><a href="#">MARKETING</a></p>
                  <h3><a href="post-2.html">We relocated our office to a new garage</a></h3>
              </header>
              <figure className="cover">
                  <a href="#"><img className="rounded-md" src="http://thetheme.io/thesaas/assets/img/thumb/1.jpg" alt="..." /></a>
              </figure>
              <summary className="summary">
                  <div className="row mb-5 small-2 text-lighter">
                    <div className="col-auto">
                      <a className="text-inherit" href="#">by Hossein</a>
                      <span className="align-middle px-1">•</span>
                      <time dateTime="2018-05-15T19:00">3 days ago</time>
                  </div>
                  <div className="col-auto ml-auto">
                      <span><i className="mdi mdi-eye pr-1 opacity-60" /> 28</span>
                      <a className="text-inherit ml-5" href="#"><i className="mdi mdi-comments pr-1 opacity-60" /> 6</a>
                  </div>
              </div>
              <p className="text-justify">Together. Great. So good was saying, that can't first let called air divide stars male isn't i. Herb third let may fourth divide. Greater gathering land you'll i their beast have. She'd form sea it wherein fowl, spirit creeping living. Likeness creepeth you hath heaven. Likeness, moveth fruitful behold. Open evening a air us behold. Saying above moving second a subdue likeness after also second.</p>
              <p className="text-center mt-7">
                <a className="btn btn-primary btn-round" href="post-2.html">Read more</a>
            </p>
        </summary>
    </Tag>
    </Fragment>
    );
};
