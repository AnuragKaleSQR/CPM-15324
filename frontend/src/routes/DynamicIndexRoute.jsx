import { useAuth } from '../context/AuthContext';
import Index from '../pages/Index';
import PMIndex from '../pages/PMindex';

const DynamicIndexRoute = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'reviewer' || user.role === 'pm') {
    return <PMIndex />;
  }

  return <Index />;
};

export default DynamicIndexRoute;