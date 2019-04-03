import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as WebFont from 'webfontloader'
import { Slide, ToastContainer } from 'react-toastify'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BodyClass } from '~/components/BodyClass'
import { MetaTags } from '~/components/MetaTags'
import { HomePage } from '~/components/pages/HomePage'
import { HookPage } from '~/components/pages/HookPage'
import { MyEventsPage } from '~/components/pages/MyEventsPage'
import { HooksListPage } from '~/components/pages/HooksListPage'
import { PasswordResetPage } from '~/components/pages/PasswordResetPage'
import { SignInPage } from '~/components/pages/SignInPage'
import { SignUpPage } from '~/components/pages/SignUpPage'
import { ConfirmAndSetPasswordPage } from '~/components/pages/ConfirmAndSetPasswordPage'
import { DappConfirmPage } from '~/components/pages/DappConfirmPage'
import { DappUserConfirmPage } from '~/components/pages/DappUserConfirmPage'
import { Nav } from '~/components/layout/Nav'
import { FourOhFour } from '~/components/pages/FourOhFour'
import * as routes from '~/../config/routes'

WebFont.load({
  typekit: {
    id: 'rjp5pbv'
  }
})

const App = class _App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  static defaultProps = {
    location: {}
  }

  render () {
    return (
      <BodyClass {...this.props}>
        <ToastContainer
          className='notus-toast'
          position='top-center'
          hideProgressBar={true}
          autoClose={7000}
          transition={Slide}
        />

        <MetaTags {...this.props} />

        <Nav />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 400, exit: 400 }}
            classNames='layout'
            appear
          >
            <Switch location={this.props.location}>
              <Route exact path={routes.HOOK} component={HookPage} />
              <Route exact path={routes.HOOKS} component={HooksListPage} />
              <Route exact path={routes.HOME} component={HomePage} />
              <Route path={routes.CONFIRM_AND_SET_PASSWORD_PAGE} component={ConfirmAndSetPasswordPage} />
              <Route path={routes.CONFIRM} component={DappUserConfirmPage} />
              <Route path={routes.MY_EVENTS} component={MyEventsPage} />
              <Route exact path={routes.SIGNUP} component={SignUpPage} />
              <Route exact path={routes.SIGNIN} component={SignInPage} />
              <Route exact path={routes.PASSWORD_RESET} component={PasswordResetPage} />
              <Route exact path={routes.DAPP_CONFIRM} component={DappConfirmPage} />
              <Route component={FourOhFour} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </BodyClass>
    )
  }
}

export const AppContainer = withRouter(hot(module)(App))
