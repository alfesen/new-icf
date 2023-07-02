import { TFallbackSection } from '../../../types/UITypes'
import Button from '../Form/Button/Button'

const FallbackSection = ({ heading, link, linkText }: TFallbackSection) => {
  return (
    <section>
      <h2>{heading}</h2>
      <Button link to={link}>
        {linkText}
      </Button>
    </section>
  )
}

export default FallbackSection
