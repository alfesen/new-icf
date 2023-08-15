import { Helmet } from 'react-helmet'
import Article from '../../../../components/shared/Article/Article'

const Beliefs = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          What we believe - International Christian Fellowship of Warsaw
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='page-article'>
        <Article route='beliefs' />
      </section>
    </>
  )
}

export default Beliefs
