import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from './components';
import { HomePage, StoragePage } from './pages';

function App() {
  return (
    <>
      <Navbar />
      <main className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/list' element={<StoragePage />} />
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
