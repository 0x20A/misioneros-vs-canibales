import { Game } from '@/game/Game';
import { HomePage } from '@/home/HomePage';
import { createBrowserRouter } from 'react-router';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'misioneros-vs-canibales',
    element: <Game />,
  },
]);
