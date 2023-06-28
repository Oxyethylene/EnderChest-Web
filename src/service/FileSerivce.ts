import { Service } from '@/service/Service'

export function getFileList() {
  return Service({
    url: '/files',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

export function uploadFile(file: File) {
  const filename = file.name
  const formData = new FormData()
  formData.set('object', file)

  return Service({
    url: '/file',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: 'kudlife',
      password: 'kudlife',
    },
    params: {
      objectName: filename,
    },
    data: formData,
  })
}

export function downloadFile(){

}

export function deleteFile(){

}