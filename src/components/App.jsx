import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { MetaTags } from '~/components/MetaTags'
import { HomePage } from '~/components/pages/HomePage'
import { HookPage } from '~/components/pages/HookPage'
import { HooksListPage } from '~/components/pages/HooksListPage'
import { SignupPage } from '~/components/pages/SignupPage'
import { NavContainer } from '~/components/layout/Nav'
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
            timeout={{ enter: 200, exit: 200 }}
            classNames='layout'
            appear
          >
            <Switch location={this.props.location}>
              <Route exact path={routes.HOOK} component={HookPage} />
              <Route exact path={routes.HOOKS} component={HooksListPage} />
              <Route exact path={routes.HOME} component={HomePage} />
              <Route exact path={routes.SIGNUP} component={SignupPage} />
              <Route component={FourOhFour} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export const AppContainer = withRouter(hot(module)(App))
