import { Service } from '@/service/Service'

export function getFileList() {
  return Service({
    url: '/api/object',
    method: 'get',
  })
}

export function uploadFile(file: File, onProgress?: (event: any) => void) {
  const filename = file.name
  const formData = new FormData()
  formData.set('object', file)

  return Service({
    url: '/api/object',
    method: 'post',
    timeout: 3000000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      objectName: filename,
    },
    data: formData,
    onUploadProgress: onProgress == null ? event => {
    } : onProgress,
  })
}

export function downloadFile(id: string) {
  return Service({
    url: '/api/object',
    method: 'get',
    params: {
      id: id,
    },
  })
}

export function deleteFile(id: string) {
  return Service({
    url: '/api/object',
    method: 'delete',
    params: {
      id: id,
    },
  })
}