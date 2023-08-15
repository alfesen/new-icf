import { Helmet } from 'react-helmet'
import Article from '../../../../components/shared/Article/Article'

const Expect = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          What to expect - International Christian Fellowship of Warsaw
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='page-article'>
        <Article route='expect' />
      </section>
    </>
  )
}

export default Expect
