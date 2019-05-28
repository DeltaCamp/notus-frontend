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
import { AdminPage } from '~/components/pages/admin/AdminPage'
import { ContractsPage } from '~/components/pages/ContractsPage'
import { ContractPage } from '~/components/pages/ContractPage'
import { HomePage } from '~/components/pages/HomePage'
import { AboutPage } from '~/components/pages/AboutPage'
import { PrivacyPage } from '~/components/pages/PrivacyPage'
import { TermsPage } from '~/components/pages/TermsPage'
import { SupportPage } from '~/components/pages/SupportPage'
import { SettingsPage } from '~/components/pages/SettingsPage'
import { MyEventsPage } from '~/components/pages/events/MyEventsPage'
import { EditEventPageWrapper } from '~/components/pages/events/EditEventPageWrapper'
import { PasswordResetPage } from '~/components/pages/PasswordResetPage'
import { SignInPage } from '~/components/pages/SignInPage'
import { SignUpPage } from '~/components/pages/SignUpPage'
import { DisableEmailPage } from '~/components/pages/DisableEmailPage'
import { ConfirmAndSetPasswordPage } from '~/components/pages/ConfirmAndSetPasswordPage'
import { AppConfirmPage } from '~/components/pages/AppConfirmPage'
import { AppUserConfirmPage } from '~/components/pages/AppUserConfirmPage'
import { FourOhFour } from '~/components/pages/FourOhFour'
import { DiscoverEventsPage } from '~/components/pages/events/DiscoverEventsPage'
import { CookieConsent } from '~/components/layout/CookieConsent'
import { Nav } from '~/components/layout/Nav'
import * as routes from '~/../config/routes'

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
          <ReactTooltip
            place='top'
            type='dark'
            effect='solid'
          />

          <ToastContainer
            className='notus-toast'
            position='bottom-center'
            hideProgressBar
            autoClose={4000}
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
                <Route exact path={routes.CONTRACTS_PAGE} component={ContractsPage} />
                <Route exact path={routes.CONTRACT_PAGE} component={ContractPage} />
                <Route exact path={routes.ADMIN} component={AdminPage} />

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
                <Route exact path={routes.ACCOUNT_SETTINGS} component={SettingsPage} />

                <Route exact path={routes.CONFIRM_AND_SET_PASSWORD_PAGE} component={ConfirmAndSetPasswordPage} />
                <Route exact path={routes.CONFIRM} component={AppUserConfirmPage} />
                <Route exact path={routes.SIGNUP} component={SignUpPage} />
                <Route exact path={routes.SIGNIN} component={SignInPage} />
                <Route exact path={routes.PASSWORD_RESET} component={PasswordResetPage} />
                <Route exact path={routes.APP_CONFIRM} component={AppConfirmPage} />

                <Route exact path={routes.DISABLE_EMAIL} component={DisableEmailPage} />

                <Route component={FourOhFour} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </BodyClass>
      )
    }
  }
))
