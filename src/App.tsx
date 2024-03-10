import { Route, Routes } from 'react-router-dom';
import { routes } from '@/constants/routes';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import WorkSpace from '@/pages/WorkSpace';

function App() {
  return (
    <Routes>
      <Route path={routes.landing} element={<Landing />} />
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.workspace} element={<WorkSpace />} />
    </Routes>
  );
}

export default App;
