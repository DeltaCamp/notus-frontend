import React, { Component } from 'react'
import { DiscoverEventsListing } from '~/components/events/DiscoverEventsListing'

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
        <svg class='top-svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <polygon points='0,100 100,0 100,100' className='has-fill-dark'></polygon>
        </svg>

        <div className='row pb100'>
          <div className='col-xs-12 has-text-centered mt50 pb100'>
            <h4 className='is-size-4 has-text-weight-bold mt75'>
              Discover common use cases to base your events on:
            </h4>
            <div className='form'>
              <input
                type='text'
                placeholder='Search ...'
                value={this.state.searchValue}
                onChange={this.handleSearchInputChange}
                onClick={this.handleInputClick}
                className='input mt20 is-dark is-large'
                style={{ maxWidth: 600 }}
              />
            </div>
  
            <div className='mt75'>
              <DiscoverEventsListing
                searchValue={this.state.searchValue}
                limit
              />
            </div>
          </div>
        </div>

        <svg class='bottom-svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <polygon points='0,100 100,0 100,100' className='has-fill-purple'></polygon>
        </svg>
      </div>
    )
  }
}
