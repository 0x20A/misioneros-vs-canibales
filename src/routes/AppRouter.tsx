import { Game } from '@/game/Game';
import { HomePage } from '@/home/HomePage';
import { createHashRouter } from 'react-router';

export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'misioneros-vs-canibales',
    element: <Game />,
  },
]);
