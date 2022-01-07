import '../styles/globals.css'
import 'rsuite/styles/index.less';
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster/>
    </>
  )

}

export default MyApp
