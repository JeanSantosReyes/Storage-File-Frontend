import { FC, useState } from 'react';

interface Props {
    onChange: (value: string | number) => void;
}

const SearchWithButton: FC<Props> = ({ onChange }) => {

    const [value, setValue] = useState('');

    const FilterFile = () => onChange(value);

    return (
        <div className='input-group mb-3'>
            <input
                className='form-control shadow'
                type='text'
                placeholder='Search with button...'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                className='btn btn-outline-secondary'
                onClick={FilterFile}
            >
                Search
            </button>
        </div>
    )
}

export default SearchWithButton