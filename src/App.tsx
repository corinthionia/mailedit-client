import { Route, Routes } from 'react-router-dom';
import { routes } from '@/constants/routes';
import WorkSpace from '@/pages/WorkSpace';

function App() {
  return (
    <Routes>
      <Route path={routes.workspace} element={<WorkSpace />} />
    </Routes>
  );
}

export default App;
