// tipos e interfaces
type Ubicacion = 'isla-izquierda' | 'barco' | 'isla-derecha';

export interface Personaje {
  id: string;
  tipo: 'canibal' | 'misionero';
  ubicacion: Ubicacion;
}

// state: estado del juego
export interface GameState {
  estadoJuego: 'jugando' | 'victoria' | 'derrota';
  posicionBarco: 'izquierda' | 'derecha';
  personajes: Personaje[];
}

// actions: acciones del juego
export type GameAction =
  | {
      type: 'MOVER_PERSONAJE';
      payload: { id: string; nuevaUbicacion: Ubicacion };
    }
  | { type: 'MOVER_BARCO' }
  | { type: 'PLAY_AGAIN' };

// estado inicial del juego
export const getInitialState = (): GameState => {
  return {
    estadoJuego: 'jugando',
    posicionBarco: 'izquierda',
    personajes: [
      {
        id: 'c1',
        tipo: 'canibal',
        ubicacion: 'isla-izquierda',
      },
      {
        id: 'c2',
        tipo: 'canibal',
        ubicacion: 'isla-izquierda',
      },
      {
        id: 'c3',
        tipo: 'canibal',
        ubicacion: 'isla-izquierda',
      },
      {
        id: 'm1',
        tipo: 'misionero',
        ubicacion: 'isla-izquierda',
      },
      {
        id: 'm2',
        tipo: 'misionero',
        ubicacion: 'isla-izquierda',
      },
      {
        id: 'm3',
        tipo: 'misionero',
        ubicacion: 'isla-izquierda',
      },
    ],
  };
};

// funciones helpers

// contador de personajes isla + barco
const countPersonajes = (
  personajes: Personaje[],
  isla: 'isla-izquierda' | 'isla-derecha',
  posicionBarco: 'izquierda' | 'derecha'
): { canibales: number; misioneros: number } => {
  const ladoBarco = isla === 'isla-izquierda' ? 'izquierda' : 'derecha';

  const personajesIsla = personajes.filter((p) => p.ubicacion === isla);
  const personajesBarco = personajes.filter(
    (p) => p.ubicacion === 'barco' && posicionBarco === ladoBarco
  );

  const totalPersonajes = [...personajesIsla, ...personajesBarco];

  const canibales = totalPersonajes.filter((p) => p.tipo === 'canibal').length;
  const misioneros = totalPersonajes.filter(
    (p) => p.tipo === 'misionero'
  ).length;

  return {
    canibales,
    misioneros,
  };
};

const checkDerrota = (
  personajes: Personaje[],
  posicionBarco: 'izquierda' | 'derecha'
): boolean => {
  const pIzq = countPersonajes(personajes, 'isla-izquierda', posicionBarco);
  const pDer = countPersonajes(personajes, 'isla-derecha', posicionBarco);

  if (
    (pIzq.misioneros > 0 && pIzq.canibales > pIzq.misioneros) ||
    (pDer.misioneros > 0 && pDer.canibales > pDer.misioneros)
  ) {
    return true;
  }

  return false;
};

const checkVictoria = (personajes: Personaje[]): boolean => {
  if (personajes.every((p) => p.ubicacion === 'isla-derecha')) {
    return true;
  }

  return false;
};

// REDUCER
export const GameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'MOVER_PERSONAJE': {
      const nuevosPersonajes = state.personajes.map((p) =>
        p.id === action.payload.id
          ? { ...p, ubicacion: action.payload.nuevaUbicacion }
          : p
      );

      const derrota = checkDerrota(nuevosPersonajes, state.posicionBarco);
      const victoria = checkVictoria(nuevosPersonajes);

      const newState = victoria ? 'victoria' : derrota ? 'derrota' : 'jugando';

      return {
        ...state,
        personajes: nuevosPersonajes,
        estadoJuego: newState,
      };
    }

    case 'MOVER_BARCO': {
      // verificar que haya al menos un personaje en el barco
      const pBarco = state.personajes.filter((p) => p.ubicacion === 'barco');

      if (pBarco.length === 0) {
        return state;
      }

      // cambiar la posicion del barco
      const nuevaPosicionBarco =
        state.posicionBarco === 'izquierda' ? 'derecha' : 'izquierda';

      // verificar victoria/derrota despues de mover el barco
      const derrota = checkDerrota(state.personajes, nuevaPosicionBarco);
      const victoria = checkVictoria(state.personajes);

      const newState = victoria ? 'victoria' : derrota ? 'derrota' : 'jugando';

      return {
        ...state,
        posicionBarco: nuevaPosicionBarco,
        estadoJuego: newState,
      };
    }

    case 'PLAY_AGAIN': {
      return getInitialState();
    }
    default:
      return state;
  }
};
