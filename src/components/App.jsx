import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as WebFont from 'webfontloader'
import ReactTooltip from 'react-tooltip'
import { Slide, ToastContainer } from 'react-toastify'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BodyClass } from '~/components/BodyClass'
import { MetaTags } from '~/components/MetaTags'
import { HomePage } from '~/components/pages/HomePage'
import { AboutPage } from '~/components/pages/AboutPage'
import { PrivacyPage } from '~/components/pages/PrivacyPage'
import { TermsPage } from '~/components/pages/TermsPage'
import { SupportPage } from '~/components/pages/SupportPage'
import { MyEventsPage } from '~/components/pages/events/MyEventsPage'
import { EditEventPageWrapper } from '~/components/pages/events/EditEventPageWrapper'
import { PasswordResetPage } from '~/components/pages/PasswordResetPage'
import { SignInPage } from '~/components/pages/SignInPage'
import { SignUpPage } from '~/components/pages/SignUpPage'
import { ConfirmAndSetPasswordPage } from '~/components/pages/ConfirmAndSetPasswordPage'
import { AppConfirmPage } from '~/components/pages/AppConfirmPage'
import { AppUserConfirmPage } from '~/components/pages/AppUserConfirmPage'
import { Nav } from '~/components/layout/Nav'
import { CookieConsent } from '~/components/layout/CookieConsent'
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
          <ReactTooltip place='top' type='light' effect='solid' />

          <ToastContainer
            className='notus-toast'
            position='bottom-center'
            hideProgressBar={true}
            autoClose={5000}
            transition={Slide}
          />

          <MetaTags {...this.props} />

          <Nav />

          <CookieConsent />

          <TransitionGroup className='is-positioned-relatively is-layer-10'>
            <CSSTransition
              key={this.props.location.key}
              timeout={{ enter: 400, exit: 400 }}
              classNames='layout'
              appear
            >
              <Switch location={this.props.location}>
                <Route exact path={routes.HOME} component={HomePage} />
                <Route exact path={routes.ABOUT_PAGE} component={AboutPage} />
                <Route exact path={routes.PRIVACY_PAGE} component={PrivacyPage} />
                <Route exact path={routes.TERMS_PAGE} component={TermsPage} />
                <Route exact path={routes.SUPPORT_PAGE} component={SupportPage} />

                <Route exact path={routes.EDIT_EVENT} component={EditEventPageWrapper} />
                <Route exact path={routes.NEW_EVENT} component={EditEventPageWrapper} />
                <Route exact path={routes.NEW_EVENT_FROM_PARENT} component={EditEventPageWrapper} />
                <Route exact path={routes.MY_EVENTS} component={MyEventsPage} />
                <Route exact path={routes.DISCOVER_EVENTS} component={DiscoverEventsPage} />

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
