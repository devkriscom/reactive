import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withSaga, withReducer, withDesign } from 'app/service';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import cn from 'classnames';
import { CommentList, CommentForm } from 'common/Discussion/Comment';
import { Header, Article } from 'common/Page';
import './Page.scss';

export class Page extends Component<{}, { isExpanded: boolean }> {
    state = {
        isExpanded: false,
    };

    expand(e: Event) {
        e.preventDefault();
        this.setState({ isExpanded: true });
    }

    render() {
        return (
            <div className={cn('page')}>
                <Header data={{
                    title: 'A new NASA contest for the next generation of space exploration',
                    meta: 'Posted on 6 December, 2018 - Last Modified on 6 December, 2018',
                }}
              />
                <main className="content">
                    <div className="container">
                        <article className="article">
                        <div itemProp="articleBody" className="article-body">
                              <p>
Freelancer.com is once again helping NASA to crowdsource talent for its new era of space exploration. The National Aeronautics and Space Administration (NASA) is
                                    <a href="/contest/NASA-Contest-Design-the-Gateway-Program-Graphic-1451793.html">holding a contest</a>
                                  {' '}
on Freelancer.com for a design to represent its new Gateway program.
                                </p>
                                <p>The Gateway program is a history-making project that aims to put a spaceship in permanent orbit around the Moon. It will allow astronauts to live and work in lunar orbit. The plan is for humans to finally go back to the Moon’s surface, something&nbsp;nobody has done since 1976.</p>
                              <p>The Gateway is also intended to provide a refuelling and resupply station in the hope of eventually acting as a staging post for astronauts travelling to Mars.&nbsp;It&nbsp;represents a new step in reaching those dreams of the future many of us have had for decades.</p>
                                <p>One of our core aims at Freelancer.com is to connect talent with ideas, and NASA’s latest contest is another great example of how we can reach that goal together.</p>
                              <p>The contest proposes a graphic to be used at the Agency, with potential use in presentation materials and Gateway team products. Freelancers will have a role in shaping the visual identity of this exciting project.&nbsp;</p>
                              <p>As NASA’s numerous successful contests have shown, Freelancer.com’s online talent marketplace is where interesting and even groundbreaking results can occur.</p>
                                <p>In 2015, for example, NASA chose an In-Space Manufacturing logo from 1,070 entries submitted by 429 freelancers.&nbsp;</p>
                                <p>Another 2015 NASA contest asked entrants to design a folding pattern for packaging a large radiation shield for future Mars missions.</p>
                                <p>Even a contest this specific received 157 entries from 78 freelancers. There really is no limit to the possibilities; if you have an idea, you can find a freelancer who can make it happen for you.</p>
                              <p>These&nbsp;examples demonstrate just how effective a crowdsourcing contest&nbsp;on Freelancer.com can be in the pursuit of brilliant solutions for tricky problems.</p>
                              <p>
What’s your Gateway? Find out more about NASA's new contest
                                  <a href="/contest/NASA-Contest-Design-the-Gateway-Program-Graphic-1451793.html">here</a>
.
                                </p>
                            </div>
                      </article>
                  </div>
              </main>
                <div className="discussion">
                    <div className="container">
                        <CommentList />
                        <CommentForm />
                  </div>
              </div>
          </div>
        );
    }
}


export default compose(withDesign({
}))(Page);
