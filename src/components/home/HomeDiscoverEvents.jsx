import React, { Component } from 'react'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'
import { SlantSVG } from '~/components/home/SlantSVG'

export class HomeDiscoverEvents extends Component {
  state = {
    searchValue: ''
  }

  handleSearchInputChange = (e) => {
    e.preventDefault()

    this.setState({
      searchValue: e.target.value.trim()
    })
  }

  handleInputClick = (e) => {
    e.preventDefault()

    if (this.state.searchValue === '') {
      this.setState({
        searchValue: ' '
      })
    }
  }

  render () {
    return (
      <div className='container-fluid is-dark pt50 pb100 color-block is-positioned-relatively'>
        <SlantSVG
          position='top'
          fill='dark'
        />

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-start-sm-2 col-md-8 col-start-md-3 col-lg-8 col-start-lg-3 has-text-centered'>
              <h1 className='is-size-1 has-text-weight-bold'>
                Share and Discover
              </h1>
              <h5 className='is-size-5'>
                Share your events with the Notus community and discover the events that others have created.
              </h5>
            </div>
          </div>

          <div className='row pb50'>
            <div className='col-xs-12 col-sm-8 col-start-sm-3 col-md-6 col-start-md-4 col-lg-6 col-start-lg-4'>
              <div className='form'>
                <input
                  type='text'
                  placeholder='Search ...'
                  value={this.state.searchValue}
                  onChange={this.handleSearchInputChange}
                  onClick={this.handleInputClick}
                  className='input mt20 is-dark is-ma-centered'
                />
              </div>
            </div>
          </div>
          <div className='pb100'>
            <DiscoverEventsListing
              searchValue={this.state.searchValue}
              showLoadMore={false}
              isDark
            />
          </div>
        </div>

      </div>
    )
  }
}
