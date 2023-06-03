import { AxiosProgressEvent } from 'axios';
import StorageApi from '../api/StorageApi'
import { IFile, IUpload } from '../interfaces'

export const uploadFile = (file: File, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
    let formData = new FormData();
    formData.append('file', file);
    return StorageApi.post<IUpload>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress
    })
}

export const getAllFiles = () => {
    return StorageApi.get<Array<IFile>>('/files');
}

export const downloadFile = (filename: string) => {
    return StorageApi.get(`/files/${filename}`, { responseType: 'blob' });
}

export const deleteFile = (filename: string) => {
    return StorageApi.delete<IFile>(`/files/${filename}`);
}