import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import VendorsPage from './pages/Vendors/VendorsPage';
import ClientsPage from './pages/Clients/ClientsPage';
import GoalsPage from './pages/Goals/GoalsPage';
import CommissionsPage from './pages/Commissions/CommissionsPage';
import AlliesPage from './pages/Allies/AlliesPage';
import PlanillaPage from './pages/Commissions/PlanillaPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}> 
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="vendedores" element={<VendorsPage />} />
        <Route path="clientes" element={<ClientsPage />} />
        <Route path="metas" element={<GoalsPage />} />
        <Route path="comisiones" element={<CommissionsPage />} />
        <Route path="comisiones/planilla" element={<PlanillaPage />} />
        <Route path="aliados" element={<AlliesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
