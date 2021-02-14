import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../listing.module.scss'
import BaseButton from '../../../components/Button/BaseButton'

// to do add description field
const mock =
  '   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet augue ligula. Pellentesque sit amet lacinia eros. Nulla lacinia odio imperdiet ligula volutpat luctus. Integer nibh leo, pellentesque nec purus et, varius ullamcorper neque. Curabitur facilisis lorem turpis, vitae lobortis diam dapibus eget. Quisque dictum arcu eros, ac scelerisque turpis accumsan in. Sed pretium, eros nec lacinia pretium, libero metus dapibus odio, eu vulputate dui velit eu neque.  ' +
  '     ' +
  '   Quisque arcu sem, feugiat ornare sollicitudin non, pulvinar ac erat. Cras ut dapibus quam, bibendum maximus quam. Ut nisl nibh, dapibus ac nunc nec, pretium dapibus neque. Maecenas tempor est sollicitudin justo dapibus accumsan. Aenean felis lectus, molestie sed feugiat sit amet, elementum a nisi. Donec dignissim posuere dui. Integer ornare bibendum volutpat. Vestibulum consequat aliquet mi, sit amet commodo purus feugiat sit amet. Aliquam ullamcorper, est ac sollicitudin tempus, augue erat hendrerit risus, in imperdiet nulla orci at est. Nullam nec dignissim lectus, et egestas quam. Phasellus sit amet mauris non diam venenatis posuere.  ' +
  '     ' +
  '   Proin dignissim sodales orci, a convallis nulla venenatis quis. Vivamus mauris quam, semper id leo eget, tincidunt tincidunt lorem. Morbi vel ipsum blandit, ullamcorper felis sed, congue ipsum. Proin mattis eget ante a bibendum. Pellentesque ac ornare velit. Vestibulum mattis enim massa, id imperdiet eros rutrum id. Sed in nulla nec purus imperdiet ullamcorper sed nec ante. Ut ullamcorper dapibus eros dictum pellentesque. Etiam at sodales libero. Fusce consequat suscipit commodo. Proin sollicitudin eu justo quis lobortis. Donec ac sem porttitor, pulvinar nunc in, elementum tortor.  ' +
  '     ' +
  '   Nullam sit amet pulvinar mi, sed pretium elit. Vestibulum a laoreet orci, ut semper velit. Quisque sollicitudin urna in odio consequat, vitae eleifend est vestibulum. Ut aliquet viverra mollis. Vestibulum sed orci nec ex iaculis pretium. Integer sagittis sit amet mi sit amet tristique. Nullam fringilla, libero quis aliquet interdum, neque eros eleifend magna, non efficitur magna tellus sed metus. Phasellus nec sollicitudin velit. Aenean dignissim et tellus in maximus. Ut dolor felis, maximus in lacinia et, egestas non erat. Ut varius elit velit, placerat consequat purus viverra non. Suspendisse consequat, velit in convallis iaculis, nibh purus pellentesque ipsum, nec fringilla odio quam non magna.  ' +
  '     ' +
  '  Donec interdum ligula id sem vestibulum, eu elementum magna eleifend. Mauris sollicitudin iaculis hendrerit. Sed ut justo ut lectus ullamcorper dignissim in tempor leo. Nunc auctor leo ac nibh auctor bibendum. Praesent at eros non purus varius pellentesque. Praesent vitae justo posuere justo ornare placerat eget et est. Pellentesque pellentesque dui at risus rutrum lacinia. Mauris faucibus laoreet ornare. Integer faucibus consectetur volutpat. Quisque nec vestibulum lectus. Sed vitae lobortis ligula. Quisque cursus suscipit tellus quis maximus.  '

const Description = () => {
  const [isShortened, setShortned] = useState(true)
  const { t } = useTranslation()
  return (
    <p className={styles.description}>
      {isShortened ? mock.substring(0, 400) : mock}
      &nbsp;
      {/* @ts-ignore */}
      <BaseButton onClick={() => setShortned(!isShortened)}>
        {isShortened ? t('button.showMore') : t('button.showLess')}...
      </BaseButton>
    </p>
  )
}

export default Description
