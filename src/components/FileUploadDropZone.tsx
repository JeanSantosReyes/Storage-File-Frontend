import { FC, useState } from 'react';
import { uploadFile } from '../services';
import Dropzone from 'react-dropzone';

const FileUploadDropZone: FC = () => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>();
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const upload = () => {
        let currentFile = selectedFiles![0];

        setProgress(0);
        setCurrentFile(currentFile);

        uploadFile(currentFile, ({ loaded, total }) => {
            setProgress(Math.round((100 * loaded) / total!));
        })
            .then(({ data }) => {
                setMessage(data.message);
            })
            .catch(() => {
                setProgress(0);
                setMessage('Could not upload the file!');
                setCurrentFile(undefined);
            })
        setSelectedFiles(undefined);
    }

    const onDrop = (files: File[]) => {
        if (files.length > 0) {
            setSelectedFiles(files);
            setProgress(0);
            setMessage('');
        }
    }

    return (
        <>
            {
                currentFile && (
                    <div className='progress my-3'>
                        <div
                            className='progress-bar progress-bar-info progress-bar-striped progress-bar-animated bg-success'
                            role='progressbar'
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: progress + '%' }}
                        >
                            {progress}%
                        </div>
                    </div>
                )
            }

            <Dropzone onDrop={onDrop} multiple={false}>
                {
                    ({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({
                                className: 'text-center bg-white text-secondary',
                                style: { padding: '30px', border: '2px dashed darkgray', marginBottom: '20px', cursor: 'pointer' }
                            })}>
                                <input {...getInputProps()} />
                                {
                                    selectedFiles && selectedFiles[0].name ? (
                                        <div className='text-black fw-bold'>
                                            {selectedFiles && selectedFiles[0].name}
                                        </div>
                                    ) : (
                                        'Drag and drop file here, or click to select file'
                                    )
                                }
                            </div>
                            <aside className='text-center'>
                                <button className='btn btn-success' disabled={!selectedFiles} onClick={upload}>
                                    Upload
                                </button>
                            </aside>
                        </section>
                    )
                }
            </Dropzone>

            {
                message && (
                    <div className='alert alert-secondary mt-3' role='alert'>
                        {message}
                    </div>
                )
            }
        </>
    )
}

export default FileUploadDropZone