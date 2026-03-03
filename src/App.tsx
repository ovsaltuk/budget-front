import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthPage from './pages/authPage/AuthPage';
import { DashboardPage } from './pages/dashboardPage.tsx/DashboardPage';
import { useAuthStore } from './stores/useAuthStore/useAuthStore';

// Создаём QueryClient ОДИН РАЗ вне компонента
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,  // 2 минуты кэш
      retry: 1,                  // 1 повтор при ошибке
    },
  },
});

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {isAuthenticated ? <DashboardPage /> : <AuthPage />}
      </div>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
