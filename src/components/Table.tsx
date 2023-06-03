import Swal from 'sweetalert2';
import fileDownload from 'js-file-download';
import { IFile } from '../interfaces';
import { deleteFile, downloadFile } from '../services';

interface Props {
    files: Array<IFile>;
    refreshList: () => void;
}

const Table: React.FC<Props> = ({ files, refreshList }) => {

    const DownloadFile = ({ name }: IFile) => {
        downloadFile(name)
            .then((res) => fileDownload(res.data, name))
            .catch((err) => console.log(err))
    }

    const DeleteFile = ({ name }: IFile) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `No podrás revertir esto!`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFile(name)
                    .catch(error => console.log(error))
                    .finally(() => refreshList())
                Swal.fire('Eliminado!', 'Su archivo ha sido eliminado.', 'success');
            }
        })
    }

    return (
        <table className='table table-hover align-middle'>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    files.map((file, index) => (
                        <tr key={index}>
                            <td><i className='bi bi-file-pdf-fill fs-2'></i></td>
                            <td>{file.name}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => DownloadFile(file)}>
                                    <i className='bi bi-cloud-arrow-down-fill'></i>
                                </button>
                                {' '}
                                <button className='btn btn-danger' onClick={() => DeleteFile(file)}>
                                    <i className='bi bi-trash-fill'></i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table