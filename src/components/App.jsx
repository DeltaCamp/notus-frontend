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
import { EventPage } from '~/components/pages/events/EventPage'
import { MyEventsPage } from '~/components/pages/events/MyEventsPage'
import { NewEventPage } from '~/components/pages/events/NewEventPage'
import { PasswordResetPage } from '~/components/pages/PasswordResetPage'
import { SignInPage } from '~/components/pages/SignInPage'
import { SignUpPage } from '~/components/pages/SignUpPage'
import { ConfirmAndSetPasswordPage } from '~/components/pages/ConfirmAndSetPasswordPage'
import { AppConfirmPage } from '~/components/pages/AppConfirmPage'
import { AppUserConfirmPage } from '~/components/pages/AppUserConfirmPage'
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
            autoClose={4000}
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
                <Route exact path={routes.HOME} component={HomePage} />

                <Route exact path={routes.NEW_EVENT} component={NewEventPage} />
                <Route exact path={routes.NEW_EVENT_FROM_PARENT} component={NewEventPage} />
                <Route exact path={routes.MY_EVENTS} component={MyEventsPage} />
                <Route exact path={routes.DISCOVER_EVENTS} component={DiscoverEventsPage} />
                <Route exact path={routes.EVENT} component={EventPage} />

                <Route exact path={routes.CONFIRM_AND_SET_PASSWORD_PAGE} component={ConfirmAndSetPasswordPage} />
                <Route exact path={routes.CONFIRM} component={AppUserConfirmPage} />
                <Route exact path={routes.SIGNUP} component={SignUpPage} />
                <Route exact path={routes.SIGNIN} component={SignInPage} />
                <Route exact path={routes.PASSWORD_RESET} component={PasswordResetPage} />
                <Route exact path={routes.APP_CONFIRM} component={AppConfirmPage} />
                
                <Route component={FourOhFour} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </BodyClass>
      )
    }
  }
))
