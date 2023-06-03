import { Search, Table } from '../components';
import { useServiceManageStorage } from '../hooks'

const StoragePage: React.FC = () => {

    const { retrieveFiles, setRecords, files, records } = useServiceManageStorage();

    return (
        <>
            <h1 className='text-center'>Storage</h1>
            <div className='container'>
                <div className='row'>
                    <Search files={files} setRecords={setRecords} />
                    <Table files={records} refreshList={retrieveFiles} />
                </div>
            </div>
        </>
    )
}

export default StoragePage