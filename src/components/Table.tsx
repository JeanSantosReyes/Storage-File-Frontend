import { useState, FC } from 'react';
import fileDownload from 'js-file-download';
import Swal from 'sweetalert2';
import DebouncedInput from './DebouncedInput';
import { deleteFile, downloadFile } from '../services';
import { IFile } from '../interfaces';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';

interface Props {
    files: Array<IFile>;
    refreshList: () => void;
}

const Table: FC<Props> = ({ files, refreshList }) => {

    const [globalFilter, setGlobalFilter] = useState<string>(''); //Search Global

    const columnHelper = createColumnHelper<IFile>();

    const columns = [
        columnHelper.accessor(row => row.name, {
            header: 'Type',
            cell: () => (
                <div className='d-flex justify-content-center'>
                    <i className='bi bi-file-pdf-fill fs-2'></i>
                </div>
            ),
            enableSorting: false,
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            cell: ({ getValue }) => getValue()
        }),
        columnHelper.accessor(row => row.name, {
            header: 'Actions',
            cell: ({ getValue }) => (
                <div className='d-flex justify-content-center gap-2'>
                    <button className='btn btn-primary' onClick={() => DownloadFile(getValue())}>
                        <i className='bi bi-cloud-arrow-down-fill'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => DeleteFile(getValue())}>
                        <i className='bi bi-trash-fill'></i>
                    </button>
                </div>
            )
        })
    ]

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

    const table = useReactTable({
        data: files,
        columns,
        state: {
            globalFilter, //Search Global
        },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter, //Search Global
        getFilteredRowModel: getFilteredRowModel(), //Search Global
        getPaginationRowModel: getPaginationRowModel(),//Pagination
        getSortedRowModel: getSortedRowModel(),//Order Asc. Desc.
    });

    return (
        <>
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className='p-2 mb-3 form-control shadow'
                placeholder='Search...'
            />
            <table className='table table-hover table-bordered align-middle'>
                <thead className='table-light'>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => {
                                        return (
                                            <th key={header.id} colSpan={header.colSpan} className='text-center'>
                                                {
                                                    header.isPlaceholder ? null : (
                                                        <div {...{
                                                            onClick: header.column.getToggleSortingHandler(),
                                                            role: 'button'
                                                        }}>
                                                            {
                                                                flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )
                                                            }
                                                            {
                                                                {
                                                                    asc: <>{' '}<i className="bi bi-caret-up-square-fill" /></>,
                                                                    desc: <>{' '}<i className="bi bi-caret-down-square-fill" /></>
                                                                }
                                                                [header.column.getIsSorted() as string] ?? null
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='d-flex align-items-center justify-content-center gap-2 mb-4'>
                <button
                    className='border rounded p-1'
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <i className='bi bi-chevron-double-left'></i>
                </button>
                <button
                    className='border rounded p-1'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <i className='bi bi-chevron-left'></i>
                </button>
                <button
                    className='border rounded p-1'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <i className='bi bi-chevron-right'></i>
                </button>
                <button
                    className='border rounded p-1'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <i className='bi bi-chevron-double-right'></i>
                </button>
                <span className='d-flex align-items-center gap-1'>
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </>
    )
}

export default Table;