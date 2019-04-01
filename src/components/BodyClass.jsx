import { PureComponent } from 'react'
import ReactTimeout from 'react-timeout'
import { getPurePathname } from '~/utils/getPurePathname'
import { getSystemInfo } from '~/utils/getSystemInfo'

export const BodyClass = ReactTimeout(
  class _BodyClass extends PureComponent {
    componentDidMount() {
      const { browser } = getSystemInfo()
      document.body.classList.add(browser)


      const purePathname = getPurePathname(this.props.location.pathname)
      document.body.classList.add(purePathname)

      
      // After X seconds if the font didn't load properly 
      // show the content anyway
      // This has to do with FOUT (lookitup)
      this.props.setTimeout(() => {
        document.body.classList.add('wf-active')
      }, 1000)
    }

    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        const oldPathname = getPurePathname(prevProps.location.pathname)
        const newPathname = getPurePathname(this.props.location.pathname)

        document.body.classList.remove(oldPathname)
        document.body.classList.add(newPathname)
      }
    }

    render() {
      return this.props.children
    }
  }
)