import { ChangeEvent, FC, useState } from 'react';
import { uploadFile } from '../services';

const FileUpload: FC = () => {

    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const selectFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { files } = target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
        setMessage('');
    };

    const upload = () => {
        setProgress(0);
        if (!currentFile) return;

        uploadFile(currentFile, ({ loaded, total = 0 }) => {
            setProgress(Math.round((100 * loaded) / total))
        })
            .then(({ data }) => {
                setMessage(data.message);
            })
            .catch((err) => {
                setProgress(0);
                if (err.response && err.response.data && err.response.data.message) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage('Could not upload the File!');
                }
                setCurrentFile(undefined);
            })
    }

    return (
        <>
            <div className='input-group'>
                <input type='file' className='form-control' onChange={selectFile} />
                <button className='btn btn-success' disabled={!currentFile} onClick={upload}>SUBIR</button>
            </div>

            {
                currentFile && (
                    <div className='progress my-3'>
                        <div
                            className='progress-bar progress-bar-info'
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

export default FileUpload