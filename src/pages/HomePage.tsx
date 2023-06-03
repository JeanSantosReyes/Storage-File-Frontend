import { FileUpload, FileUploadDropZone } from '../components'

const HomePage: React.FC = () => {

    return (
        <>
            <h1 className='text-center my-3'>Upload File</h1>
            <FileUpload />
            <h1 className='text-center my-3'>Drag Drop File</h1>
            <FileUploadDropZone />
        </>
    )
}

export default HomePage