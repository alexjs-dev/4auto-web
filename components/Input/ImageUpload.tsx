import React, { useState } from 'react'
import Upload from 'rc-upload'
import classNames from 'classnames'
import filter from 'lodash/filter'
import get from 'lodash/get'
import size from 'lodash/size'
import isArray from 'lodash/isArray'
import { Field } from 'redux-form'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import styles from './ImageUpload.module.scss'
import { MdImage } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'

import InputLabel from './parts/InputLabel'
import axios from 'axios'
import { BaseButton } from '../Button'
import { imageUpload } from '~/utils/imageUpload'

type Input = {
  name: string
  onBlur: (event: any) => void
  onChange: (event: any) => void
  onDragStart: (event: any) => void
  onDrop: (event: any) => void
  onFocus: (event: any) => void
  value: any
}

type Props = {
  label?: string
  name: string
  isRequired?: boolean
  input: Input
  meta: any
}

type ProgressBarProps = {
  percent?: number
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  percent,
}) => {
  if (!percent) return null
  const style = { '--progress-bar': `${percent}%` }
  return (
    <section className={styles.progressBarContainer}>
      {/* @ts-ignore */}
      <div className={styles.progress} style={style} />
    </section>
  )
}

const ImageUpload: React.FunctionComponent<Props> = ({
  label,
  name,
  isRequired,
  input,
  meta,
}) => {
  // const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  const { t } = useTranslation()

  const { error, invalid } = meta

  const images = isArray(input.value) ? input.value : []
  const limit = 6
  const disabled = size(images) >= limit
  const setImages = (image: any) => {
    const list = isArray(images) ? images : []
    input.onChange([...list, image])
  }

  const baseUrl = 'https://forautobackend.herokuapp.com/images'
  const baseHeaders = {
    Authorization: `Bearer ${localStorage.getItem('feathers-jwt')}`,
  }

  const reset = () => {
    setLoading(false)
    setPercent(0)
  }

  const deleteImage = async (id: string) => {
    if (id) {
      try {
        await axios.delete(`${baseUrl}/${id}`, {
          headers: baseHeaders,
        })
        toast.success(`${t('snackbar.deleteSuccessful')}`)
        const list = isArray(images) ? images : []
        input.onChange(filter(list, (image) => get(image, '_id') !== id))
      } catch (e) {
        console.error(e)
      }
    }
  }

  const uploadProps = imageUpload({
    baseUrl,
    setLoading,
    reset,
    setPercent,
    setImages,
    baseHeaders,
  })

  const errorState = error || invalid

  return (
    <div className={styles.container} id={`field-${name}`}>
      {/* @ts-ignore */}
      <InputLabel
        isRequired={isRequired}
        label={`${label} (${limit})`}
        name={name}
      />
      <div
        className={classNames(
          styles.input,
          disabled && styles.disabled,
          errorState && styles.error
        )}
      >
        {loading ? (
          <div className={styles.loaders}>
            <ProgressBar percent={percent} />
          </div>
        ) : (
          /* @ts-ignore */
          <Upload {...uploadProps} disabled={disabled}>
            <MdImage fontSize={64} />
            <h6>{t('button.pressToUploadImages')}</h6>
          </Upload>
        )}
      </div>
      <div className={styles.images}>
        {images.map((image) => (
          /* @ts-ignore */
          <div className={styles.image} key={image._id}>
            {/* @ts-ignore */}
            <img src={image.url} alt={image.public_id} />
            {/* @ts-ignore */}
            <BaseButton
              className={styles.deleteButton}
              onClick={() => deleteImage(image._id)}
            >
              <FiTrash2 color="#fff" fontSize={32} />
            </BaseButton>
          </div>
        ))}
      </div>
    </div>
  )
}

type ComponentProps = {
  label?: string
  name: string
  isRequired?: boolean
}

const Component: React.FunctionComponent<ComponentProps> = ({
  name,
  label,
  isRequired,
}) => {
  if (!name) return null
  return (
    <Field
      name={name}
      component={ImageUpload}
      props={{ label, name, isRequired }}
    />
  )
}

export default Component
