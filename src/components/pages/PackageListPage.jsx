import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { FooterContainer } from '~/components/layout/Footer'
import { ErrorMessage } from '~/components/ErrorMessage'
import { PackageList } from '~/components/packages/PackageList'
import { LandingHero } from '~/components/packages/LandingHero'
import { CodeBox } from '~/components/CodeBox'
import { ResearchersList } from '~/components/researchers/ResearchersList'
import { web3Queries } from '~/queries/web3Queries'
import * as routes from '~/../config/routes'

export class PackageListPage extends PureComponent {
  render () {
    const heroColor = 'is-link'

    return (
      <div className='is-positioned-absolutely'>
        <LandingHero heroColor={heroColor} />
        
        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-lg-6'>
                {/* <CodeBox /> */}
                {/* <p>
                  <a href='https://docs.zeppelinos.org' target='_blank' rel='noopener noreferrer'>See EVM Package Docs &gt;</a>
                </p> */}
                <Query query={web3Queries.networkIdQuery}>
                  {({ data }) => {
                    const wrongNetwork = data && data.networkId && allowedNetworkIds().indexOf(data.networkId) === -1

                    if (wrongNetwork) {
                      return <ErrorMessage errorMessage={
                        `No hooks available on the currently selected Ethereum network.`
                      } />
                    } else {
                      return <PackageList location={this.props.location} />
                    }
                  }}
                </Query>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}
