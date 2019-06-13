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
import { EditContractPage } from '~/components/pages/EditContractPage'
import { StatusPage } from '~/components/pages/StatusPage'
import { ContractsPage } from '~/components/pages/ContractsPage'
import { ContractPageWrapper } from '~/components/pages/ContractPageWrapper'
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
import { withTracker } from '~/components/withTracker'
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
                <Route exact path={routes.ADMIN} component={withTracker(AdminPage)} />
                <Route exact path={routes.STATUS} component={withTracker(StatusPage)} />

                <Route exact path={routes.EDIT_CONTRACT} component={withTracker(EditContractPage)} />
                <Route exact path={routes.NEW_CONTRACT} component={withTracker(EditContractPage)} />
                <Route exact path={routes.CONTRACTS} component={withTracker(ContractsPage)} />
                <Route exact path={routes.CONTRACT} component={withTracker(ContractPageWrapper)} />

                <Route exact path={routes.HOME} component={withTracker(HomePage)} />
                <Route exact path={routes.ABOUT_PAGE} component={withTracker(AboutPage)} />
                <Route exact path={routes.PRIVACY_PAGE} component={withTracker(PrivacyPage)} />
                <Route exact path={routes.TERMS_PAGE} component={withTracker(TermsPage)} />
                <Route exact path={routes.SUPPORT_PAGE} component={withTracker(SupportPage)} />

                <Route exact path={routes.EDIT_EVENT} component={withTracker(EditEventPageWrapper)} />
                <Route exact path={routes.NEW_EVENT} component={withTracker(EditEventPageWrapper)} />
                <Route exact path={routes.NEW_EVENT_FROM_PARENT} component={withTracker(EditEventPageWrapper)} />
                <Route exact path={routes.MY_EVENTS} component={withTracker(MyEventsPage)} />
                <Route exact path={routes.DISCOVER_EVENTS} component={withTracker(DiscoverEventsPage)} />
                <Route exact path={routes.ACCOUNT_SETTINGS} component={withTracker(SettingsPage)} />

                <Route exact path={routes.CONFIRM_AND_SET_PASSWORD_PAGE} component={withTracker(ConfirmAndSetPasswordPage)} />
                <Route exact path={routes.CONFIRM} component={withTracker(AppUserConfirmPage)} />
                <Route exact path={routes.SIGNUP} component={withTracker(SignUpPage)} />
                <Route exact path={routes.SIGNIN} component={withTracker(SignInPage)} />
                <Route exact path={routes.PASSWORD_RESET} component={withTracker(PasswordResetPage)} />
                <Route exact path={routes.APP_CONFIRM} component={withTracker(AppConfirmPage)} />

                <Route exact path={routes.DISABLE_EMAIL} component={withTracker(DisableEmailPage)} />

                <Route component={withTracker(FourOhFour)} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </BodyClass>
      )
    }
  }
))
