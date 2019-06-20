import { Component } from 'react'
import ReactTimeout from 'react-timeout'

import * as routes from '~/../config/routes'
import { getSystemInfo } from '~/utils/getSystemInfo'

const Y_POS_LOCK = 650
const Y_POS_OFFSET = 100
const SPEED = 1000.08

export const BodyClass = ReactTimeout(
  class _BodyClass extends Component {

    state = {
      scrollTop: 0
    }

    componentDidMount () {
      const { browser } = getSystemInfo()
      document.body.classList.add(browser)

      document.body.classList.add(this.sanatizePathname(this.props.location.pathname))

      // After X seconds if the font didn't load properly
      // show the content anyway
      // This has to do with FOUT (lookitup)
      this.props.setTimeout(() => {
        document.body.classList.add('wf-active')
      }, 1000)


      const root = document.getElementsByTagName('html')[0];
      root.classList.add('home-page-body')
      window.addEventListener('scroll', this.updateBgPosition)
      this.updateBgPosition()
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.updateBgPosition)
    }

    componentDidUpdate (prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        const oldPathname = prevProps.location.pathname
        const newPathname = this.props.location.pathname

        document.body.classList.remove(this.sanatizePathname(oldPathname))
        document.body.classList.add(this.sanatizePathname(newPathname))
      }
    }

    updateBgPosition = () => {
      if (this.props.location.pathname === routes.HOME) {
        const scrollTop = window.pageYOffset !== undefined ?
          window.pageYOffset :
          (document.documentElement || document.body.parentNode || document.body).scrollTop

        if (scrollTop < Y_POS_LOCK) {
          // const root = document.getElementsByTagName('html')[0];

          // normalizedScrollTop between 0 and 1 (if range is 0...1000)
          const t = scrollTop * 0.0013
          const newPx = (
            (t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t) * -SPEED
          ) - Y_POS_OFFSET
          
          let styleElem = document.getElementById('body-bg-style')
          if (!styleElem) {
            styleElem = document.head.appendChild(
              document.createElement("style")
            )
            styleElem.setAttribute('id', 'body-bg-style')
          }
          
          styleElem.innerHTML = `.home-page-body:before { transform: translate3d(0px, ${newPx}px, 0px) }`;
        }
      }
    }

    sanatizePathname = (pathname) => {
      pathname = pathname.substr(1).replace('/', '-')

      if (!pathname.length) { pathname = 'home' }

      return pathname
    }


    render () {
      return this.props.children
    }
  }
)
