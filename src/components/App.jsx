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
import { MyEventsPage } from '~/components/pages/events/MyEventsPage'
import { NewEventPage } from '~/components/pages/events/NewEventPage'
import { HooksListPage } from '~/components/pages/HooksListPage'
import { NewRecipePage } from '~/components/pages/NewRecipePage'
import { PasswordResetPage } from '~/components/pages/PasswordResetPage'
import { SignInPage } from '~/components/pages/SignInPage'
import { SignUpPage } from '~/components/pages/SignUpPage'
import { ConfirmAndSetPasswordPage } from '~/components/pages/ConfirmAndSetPasswordPage'
import { DappConfirmPage } from '~/components/pages/DappConfirmPage'
import { DappUserConfirmPage } from '~/components/pages/DappUserConfirmPage'
import { Nav } from '~/components/layout/Nav'
import { FourOhFour } from '~/components/pages/FourOhFour'
import * as routes from '~/../config/routes'
import { DiscoverEventsPage } from './pages/events/DiscoverEventsPage';

WebFont.load({
  typekit: {
    id: 'rjp5pbv'
  }
})

export const App = withRouter(hot(module)(
  class _App extends PureComponent {
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
                <Route exact path={routes.CONFIRM_AND_SET_PASSWORD_PAGE} component={ConfirmAndSetPasswordPage} />
                <Route exact path={routes.CONFIRM} component={DappUserConfirmPage} />
                <Route exact path={routes.NEW_EVENT} component={NewEventPage} />
                <Route exact path={routes.NEW_EVENT_FROM_EVENT_TYPE} component={NewEventPage} />
                <Route exact path={routes.MY_EVENTS} component={MyEventsPage} />
                <Route exact path={routes.DISCOVER_EVENTS} component={DiscoverEventsPage} />
                <Route exact path={routes.SIGNUP} component={SignUpPage} />
                <Route exact path={routes.SIGNIN} component={SignInPage} />
                <Route exact path={routes.PASSWORD_RESET} component={PasswordResetPage} />
                <Route exact path={routes.DAPP_CONFIRM} component={DappConfirmPage} />
                <Route exact path={routes.NEW_RECIPE} component={NewRecipePage} />
                <Route component={FourOhFour} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </BodyClass>
      )
    }
  }
))
