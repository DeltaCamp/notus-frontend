import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { MetaTags } from '~/components/MetaTags'
import { PackageListPage } from '~/components/pages/PackageListPage'
import { NavContainer } from '~/components/layout/Nav'
import { BetaSignupPage } from '~/components/pages/BetaSignupPage'
import { PackageItemPage } from '~/components/pages/PackageItemPage'
import { ResearcherPage } from '~/components/pages/ResearcherPage'
import { FourOhFour } from '~/components/pages/FourOhFour'
import { getPurePathname } from '~/utils/getPurePathname'
import * as routes from '~/../config/routes'
import { getSystemInfo } from '~/utils/getSystemInfo'

const App = class _App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    location: {}
  }

  currentPage = () => {
    const pathname = this.props.location.pathname
    return getPurePathname(pathname)
  }

  render () {
    const { browser } = getSystemInfo()

    return (
      <div className={browser}>
        <MetaTags {...this.props} cssClass={this.currentPage()} />

        <NavContainer />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 700, exit: 200 }}
            classNames='layout'
            appear
          >
            <Switch location={this.props.location}>
              <Route exact path={routes.BETA_SIGNUP} component={BetaSignupPage} />

              <Route path={routes.RESEARCHER} component={ResearcherPage} />
              <Route path={routes.PACKAGE_ITEM} component={PackageItemPage} />

              <Route exact path={routes.HOME} component={PackageListPage} />
              <Route exact path={routes.HOME_RESEARCHERS_LIST} component={PackageListPage} />

              <Route component={FourOhFour} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export const AppContainer = withRouter(hot(module)(App))
