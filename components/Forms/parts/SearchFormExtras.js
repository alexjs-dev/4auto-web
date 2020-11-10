import React from 'react'
import { useTranslation } from 'react-i18next'
import { fieldTypes } from '~utils/formValidators'
import { ColorPicker, RangePicker } from '~components'

const SearchFormExtras = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ColorPicker name={fieldTypes.color} />
      <RangePicker
        name={fieldTypes.price}
        minLabel={t('label.priceMin')}
        minPlaceholder={t('placeholder.priceMin')}
        maxLabel={t('label.priceMax')}
        minVal={0}
        maxPlaceholder={t('placeholder.priceMax')}
      />
      <RangePicker
        name={fieldTypes.year}
        minLabel={t('label.yearMin')}
        minPlaceholder={t('placeholder.yearMin')}
        maxLabel={t('label.yearMax')}
        minVal={1960}
        maxVal={new Date().getFullYear()}
        maxPlaceholder={t('placeholder.yearMax')}
      />
    </div>
  )
}

export default SearchFormExtras
