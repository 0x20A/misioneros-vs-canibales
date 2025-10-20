import { RouterProvider } from 'react-router';
import { appRouter } from './routes/AppRouter';

export const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
