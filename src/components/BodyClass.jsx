import { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import { getSystemInfo } from '~/utils/getSystemInfo'

export const BodyClass = ReactTimeout(
  class _BodyClass extends PureComponent {
    componentDidMount() {
      const { browser } = getSystemInfo()
      document.body.classList.add(browser)


      document.body.classList.add(this.sanatizePathname(this.props.location.pathname))
      
      // After X seconds if the font didn't load properly 
      // show the content anyway
      // This has to do with FOUT (lookitup)
      this.props.setTimeout(() => {
        document.body.classList.add('wf-active')
      }, 1000)
    }

    sanatizePathname = (pathname) => {
      pathname = pathname.substr(1).replace('/', '-')

      if (!pathname.length) { pathname = 'home' }

      return pathname
    }

    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        const oldPathname = prevProps.location.pathname
        const newPathname = this.props.location.pathname

        document.body.classList.remove(this.sanatizePathname(oldPathname))
        document.body.classList.add(this.sanatizePathname(newPathname))
      }
    }

    render() {
      return this.props.children
    }
  }
)