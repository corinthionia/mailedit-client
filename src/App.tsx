import { Route, Routes } from 'react-router-dom';
import { routes } from '@/constants/routes';
import WorkSpace from '@/pages/WorkSpace';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path={routes.workspace} element={<WorkSpace />} />
      <Route path={routes.home} element={<Home />} />
    </Routes>
  );
}

export default App;
