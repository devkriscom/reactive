import React, { Component } from 'react';
import {
    HashRouter, Link, Route, Switch,
} from 'react-router-dom';
import GlobalNavigation from '@atlaskit/global-navigation';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import IssueIcon from '@atlaskit/icon/glyph/issue';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import PortfolioIcon from '@atlaskit/icon/glyph/portfolio';
import { JiraIcon, JiraWordmark } from '@atlaskit/logo';
import {
    LayoutManagerWithViewController,
    NavigationProvider,
    ViewController,
    withNavigationViewController,
    ContainerHeader,
    GroupHeading,
    HeaderSection,
    Item,
    ItemAvatar,
    light,
    MenuSection,
    SectionHeading,
    Separator,
    GlobalItem,
} from '@atlaskit/navigation-next';

sdfsdf;
const LinkItem = ({ components: { Item }, to, ...props }) => {
    return (<Route render={({ location: { pathname } }) => (<Item component={({ children, className }) => (<Link className={className} to={to}>{children}</Link>)} isSelected={pathname === to} {...props} />)} />);
};


const MyGlobalNavigation = () => (
    <GlobalNavigation
        productIcon={() => <JiraIcon size="medium" />}
    onProductClick={() => {

        }
        }
    productHref="#"
    onCreateClick={(props) => {

        }
        }
        onSearchClick={() => console.log('search clicked')}
    onNotificationClick={() => { return (<div>helpItems</div>); }}
    appSwitcherComponent={(props) => {
            return (
              <GlobalItem
                    {...props}
                  icon={AppSwitcherIcon}
                  onClick={() => console.log('AppSwitcher clicked')}
                />
            );
        }}
    helpItems={() => { return (<div>helpItems</div>); }}
    loginHref="#login"
  />
);

const productHomeView = {
    id: 'product/home',
    type: 'container',
    getItems: () => [
        {
            type: 'HeaderSection',
            id: 'product/home:header',
            subText: 'Project description',
            items: [
                {
                    type: 'HeaderSection',
                    id: 'project/home:header',
                    items: [{
                        type: 'ContainerHeader',
                        before: itemState => (
                            <ItemAvatar
                                itemState={itemState}
                                appearance="square"
                            size="large"
                          />
                        ),
                        text: 'My project',
                        subText: 'Project description',
                        id: 'project-header',
                    }],
                },
                {
                    type: 'MenuSection',
                    nestedGroupKey: 'menu',
                    id: 'product/home:menu',
                    parentId: null,
                    items: [
                        {
                            type: 'InlineComponent',
                            id: 'dashboards',
                            before: DashboardIcon,
                            text: 'Dashboards',
                            component: LinkItem,
                            to: '/shop',
                        },
                        {
                            type: 'Item', id: 'projects', before: FolderIcon, text: 'Projects',
                        },
                        {
                            type: 'Item',
                            id: 'issues-and-filters',
                            goTo: 'product/issues',
                            before: IssueIcon,
                            text: 'Issues and filters',
                        },
                        { type: 'Separator', id: 'separator' },
                        {
                            type: 'Item',
                            id: 'portfolio',
                            before: PortfolioIcon,
                            text: 'Portfolio',
                        },
                    ],
                }],
        }],
};

const productIssuesView = {
    id: 'product/issues',
    type: 'container',
    getItems: () => [
        {
            type: 'HeaderSection',
            id: 'product/issues:header',
            items: [{
                type: 'BackItem',
                id: 'back-item',
                goTo: 'product/home',
                text: 'Back to Jira',
            }],
        },
        {
            type: 'MenuSection',
            nestedGroupKey: 'menu',
            id: 'product/issues:menu',
            parentId: 'product/home:menu',
            alwaysShowScrollHint: true,
            items: [
                {
                    type: 'SectionHeading',
                    text: 'Issues and filters',
                    id: 'issues-and-filters-heading',
                },
                { type: 'Item', text: 'Search issues', id: 'search-issues' },
                { type: 'GroupHeading', id: 'other-heading', text: 'Other' },
                { type: 'Item', text: 'My open issues', id: 'my-open-issues' },
                { type: 'Item', text: 'Reported by me', id: 'reported-by-me' },
                { type: 'Item', text: 'All issues', id: 'all-issues' },
                { type: 'Item', text: 'Open issues', id: 'open-issues' },
                { type: 'Item', text: 'Done issues', id: 'done-issues' },
                { type: 'Item', text: 'Viewed recently', id: 'viewed-recently' },
                { type: 'Item', text: 'Created recently', id: 'created-recently' },
                { type: 'Item', text: 'Resolved recently', id: 'resolved-recently' },
                { type: 'Item', text: 'Updated recently', id: 'updated-recently' },
                { type: 'Separator', id: 'separator' },
                { type: 'Item', text: 'View all filters', id: 'view-all-filters' },
            ],
        },
    ],
};

class App extends Component<{ navigationViewController: ViewController }> {
    componentDidMount() {
        const { navigationViewController } = this.props;
        navigationViewController.addView(productHomeView);
        navigationViewController.addView(productIssuesView);
        navigationViewController.setView(productHomeView.id);
    }

    render() {
        return (
          <LayoutManagerWithViewController globalNavigation={MyGlobalNavigation}>
              <div style={{ padding: 30 }}>{this.props.children}</div>
            </LayoutManagerWithViewController>

        );
    }
}


const Navbar = withNavigationViewController(App);

export default (props) => {
    return (
      <NavigationProvider>
          <Navbar {...props} />
        </NavigationProvider>
    );
};
