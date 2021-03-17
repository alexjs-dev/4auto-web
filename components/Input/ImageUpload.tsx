import React, { useState } from 'react'
import Upload from 'rc-upload'
import styles from './ImageUpload.module.scss'
import { MdImage } from 'react-icons/md'

import InputLabel from './parts/InputLabel'
import axios from 'axios'

type Props = {
  label?: string
  name: string
  isRequired?: boolean
}

const ImageUpload: React.FunctionComponent<Props> = ({
  label,
  name,
  isRequired,
}) => {
  const [images, setImages] = useState([])
  const props = {
    action: 'https://forautobackend.herokuapp.com/images',
    type: 'drag',
    accept: '.png,.jpg,.jpeg,.heic',
    beforeUpload(file: File) {
      console.log('beforeUpload', file.name)
    },
    onStart: (file: File) => {
      console.log('onStart', file.name)
    },
    onSuccess(file: File) {
      console.log('onSuccess', file)
      /* @ts-ignore */
      setImages((prev) => [...prev, file])
    },
    onProgress(step: any, file: File) {
      console.log('onProgress', Math.round(step.percent), file.name)
    },
    onError(err: any) {
      console.log('onError', err)
    },
    style: {
      width: '100%',
      height: '100%',
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key])
        })
      }
      formData.append('image', file)

      axios
        .post(action, formData, {
          withCredentials,
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem('feathers-jwt')}`,
          },
          onUploadProgress: ({ total, loaded }) => {
            onProgress(
              { percent: Math.round((loaded / total) * 100).toFixed(2) },
              file
            )
          },
        })
        .then(({ data: response }) => {
          onSuccess(response, file)
        })
        .catch(onError)

      return {
        abort() {
          console.log('upload progress is aborted.')
        },
      }
    },
  }

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <InputLabel isRequired={isRequired} label={label} name={name} />
      <div className={styles.input}>
        {/* @ts-ignore */}
        <Upload {...props}>
          <MdImage fontSize={64} />
          <h6>Press to upload pictures</h6>
        </Upload>
      </div>
      <div className={styles.images}>
        {images.map((image) => (
          /* @ts-ignore */
          <img src={image.url} key={image._id} alt={image.public_id} />
        ))}
      </div>
    </div>
  )
}

export default ImageUpload
