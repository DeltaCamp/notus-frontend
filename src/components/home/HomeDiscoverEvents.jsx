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
      <div className='container-fluid is-dark mt100 pb100 color-block is-positioned-relatively'>
        <SlantSVG
          position='top'
          polygonClass='has-fill-dark'
        />

        <div className='container'>
          <div className='row pb50'>
            <div className='col-xs-12 col-sm-10 col-start-sm-2 has-text-centered'>
              <h4 className='is-size-4 has-text-weight-bold mt75'>
                Share and Discover
              </h4>
              <h5 className='is-size-6'>
                Share your events with the Notus community and discover the events that others have created.
              </h5>
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

        <SlantSVG
          position='bottom'
          polygonClass='has-fill-pink'
        />
      </div>
    )
  }
}
