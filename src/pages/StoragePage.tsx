import { Table } from '../components';
import { useServiceManageStorage } from '../hooks'

const StoragePage: React.FC = () => {

    const { retrieveFiles, files } = useServiceManageStorage();

    return (
        <>
            <h1 className='text-center'>Storage</h1>
            <div className='container'>
                <div className='row'>
                    <Table files={files} refreshList={retrieveFiles} />
                </div>
            </div>
        </>
    )
}

export default StoragePage