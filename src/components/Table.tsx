import DataTable, { TableColumn } from 'react-data-table-component';
import fileDownload from 'js-file-download';
import Swal from 'sweetalert2';
import { IFile } from '../interfaces';
import { deleteFile, downloadFile } from '../services';
import Loading from './Loading';

interface Props {
    files: Array<IFile>;
    refreshList: () => void;
    loading: boolean;
}

const Table: React.FC<Props> = ({ files, refreshList, loading }) => {

    const DownloadFile = (filename: string) => {
        downloadFile(filename)
            .then((res) => fileDownload(res.data, filename))
            .catch((err) => console.log(err))
    }

    const DeleteFile = (filename: string) => {
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
                deleteFile(filename)
                    .catch(error => console.log(error))
                    .finally(() => refreshList())
                Swal.fire('Eliminado!', 'Su archivo ha sido eliminado.', 'success');
            }
        })
    }

    const columns: TableColumn<IFile>[] = [
        {
            width: '70px',
            center: true,
            cell: () => (
                <div className='d-flex justify-content-center'>
                    <i className='bi bi-file-pdf-fill fs-2'></i>
                </div>
            )
        },
        {
            name: 'File',
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: 'Actions',
            width: '200px',
            center: true,
            cell: ({ name }) => (
                <div className='d-flex justify-content-center gap-2'>
                    <button className='btn btn-primary' onClick={() => DownloadFile(name)}>
                        <i className='bi bi-cloud-arrow-down-fill'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => DeleteFile(name)}>
                        <i className='bi bi-trash-fill'></i>
                    </button>
                </div>
            )
        }
    ]

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <DataTable
            className='my-4'
            columns={columns}
            data={files}
            highlightOnHover
            progressPending={loading}
            progressComponent={<Loading />}
            pagination
            paginationComponentOptions={paginationComponentOptions}
        />
    )
}

export default Table