import React, { Component } from 'react'
import classnames from 'classnames'

export const EventHistory =
  class _EventHistory extends Component {
    render () {
      return (
        <div
          className={classnames(
            'container'
          )}
        >
          <div className='row'>
            <div className='col-xs-12 col-md-6 col-start-md-4 pb100'>
              <h5 className='is-size-5 has-text-centered is-uppercase has-text-weight-bold mt20 pt20'>
                Event History
              </h5>
              <p className='has-text-centered has-text-weight-bold has-text-link'>
                Triggered 4 times:
              </p>
              <br />

              <table className='table is-striped is-hoverable is-fullwidth'>
                <tbody>
                  <tr>
                    <td>
                      <strong>Sent email:</strong>
                    </td>
                    <td>
                      Jan 12<sup>th</sup>, 1994
                    </td>
                    <td>
                      2:03pm
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Sent email:</strong>
                    </td>
                    <td>
                      March 3<sup>rd</sup>
                    </td>
                    <td>
                      4:03pm
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Sent email:</strong>
                    </td>
                    <td>
                      July 4<sup>th</sup>, 2018
                    </td>
                    <td>
                      6:03pm
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Sent email:</strong>
                    </td>
                    <td>
                      Dec 31<sup>st</sup>, 2019
                    </td>
                    <td>
                      1:01am
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      )
    }
  }
