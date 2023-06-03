import { FC, memo } from 'react';
import { IFile } from '../interfaces';

interface Props {
    setRecords: (value: Array<IFile>) => void;
    files: Array<IFile>;
}

const Search: FC<Props> = ({ setRecords, files }) => {

    const Filter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecords(files.filter(file => file.name.toLowerCase().includes(e.target.value)));
    }

    return (
        <input type='text' className='form-control' placeholder='Search' onChange={(e) => Filter(e)} />
    )
}

export default memo(Search) 