import { useEffect, useState } from 'react';
import { IFile } from '../interfaces';
import { getAllFiles } from '../services';

export const useServiceManageStorage = () => {

    const [files, setFiles] = useState<Array<IFile>>([]);
    const [records, setRecords] = useState<Array<IFile>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        retrieveFiles();
    }, []);

    const retrieveFiles = () => {
        setLoading(true);
        getAllFiles()
            .then(({ data }) => {
                setFiles(data);
                setRecords(data);
            })
            .catch((e: Error) => console.log(e))
            .finally(() => setLoading(false))
    };

    return {
        retrieveFiles,
        setRecords,
        files,
        records,
        loading
    }
}
