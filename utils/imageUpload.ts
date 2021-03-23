import axios from 'axios'
import { toast } from 'react-toastify'

type Props = {
  baseUrl: string
  setLoading: (value: boolean) => void
  reset: () => void
  setPercent: (value: number) => void
  setImages: (value: any) => void
  baseHeaders: any
}

export const imageUpload = ({
  baseUrl,
  setLoading,
  reset,
  setPercent,
  setImages,
  baseHeaders,
}: Props) => {
  const props = {
    action: baseUrl,
    type: 'drag',
    accept: '.png,.jpg,.jpeg,.heic',
    // beforeUpload(file: File) {
    //   console.log('beforeUpload', file.name)
    // },
    onStart: (file: File) => {
      if (file) setLoading(true)
    },
    onSuccess(file: File) {
      /* @ts-ignore */
      if (file) setImages(file)
      reset()
    },
    onProgress(step: any, file: File) {
      if (file) setPercent(Math.round(step.percent))
    },
    onError(err: any) {
      if (err) toast.error(`😡 ${err.message}`)
      reset()
    },
    style: {
      width: '100%',
      height: '100%',
    },
    customRequest(reqProps: any) {
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const {
        action,
        data,
        file,
        // filename,
        headers,
        onError,
        onProgress,
        onSuccess,
        withCredentials,
      } = reqProps
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
            ...baseHeaders,
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
  return props
}
