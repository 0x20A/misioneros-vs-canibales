import { useState, useRef, useReducer } from 'react';
import { motion } from 'framer-motion';
import { type PanInfo } from 'framer-motion';
import { SpringModal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import Cloud from '@/components/cloud';
import canibal from '../assets/canibal.png';
import misionero from '../assets/misionero.png';
import { GameReducer, getInitialState } from './reducers/GameReducer';

export const Game = () => {
  // useReducer maneja todo el estado del juego
  const [state, dispatch] = useReducer(GameReducer, getInitialState());

  // modal de reglas
  const [openModal, setOpenModal] = useState(false);

  // ref a las islas y barco en el DOM
  const barcoRef = useRef<HTMLDivElement>(null);
  const islaIzquierdaRef = useRef<HTMLDivElement>(null);
  const islaDerechaRef = useRef<HTMLDivElement>(null);

  // evento de drag a los personajes
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    id: string
  ) => {
    if (!barcoRef.current) return;

    const personaje = state.personajes.find((p) => p.id === id);
    if (!personaje) return;

    // solo se puede interactuar si el personaje esta en la isla o barco de la orilla actual
    const interactuar =
      (state.posicionBarco === 'izquierda' &&
        (personaje.ubicacion === 'isla-izquierda' ||
          personaje.ubicacion === 'barco')) ||
      (state.posicionBarco === 'derecha' &&
        (personaje.ubicacion === 'isla-derecha' ||
          personaje.ubicacion === 'barco'));
    if (!interactuar) return;

    // coordenadas del drop (barco)
    const barcoRect = barcoRef.current.getBoundingClientRect();
    const personajeX = info.point.x;
    const personajeY = info.point.y;

    // ubicacion si se suelta sobre el barco
    const enBarco =
      personajeX >= barcoRect.left &&
      personajeX <= barcoRect.right &&
      personajeY >= barcoRect.top &&
      personajeY <= barcoRect.bottom;

    if (enBarco) {
      // maximo 2 personajes en barco
      const persEnBarco = state.personajes.filter(
        (p) => p.ubicacion === 'barco'
      ).length;

      if (persEnBarco < 2) {
        // mover el personaje desde reducer
        dispatch({
          type: 'MOVER_PERSONAJE',
          payload: { id, nuevaUbicacion: 'barco' },
        });
      }
    } else if (personaje.ubicacion === 'barco') {
      // si se suelta fuera del barco regresa a la isla
      const nuevaUbicacion =
        state.posicionBarco === 'izquierda' ? 'isla-izquierda' : 'isla-derecha';
      dispatch({
        type: 'MOVER_PERSONAJE',
        payload: { id, nuevaUbicacion },
      });
    }
  };

  // personajes en cada ubicacion
  const pIzq = state.personajes.filter((p) => p.ubicacion === 'isla-izquierda');
  const pDer = state.personajes.filter((p) => p.ubicacion === 'isla-derecha');
  const pBarco = state.personajes.filter((p) => p.ubicacion === 'barco');

  // mover barco de una orilla a otra solo si hay al menos un personaje a bordo y el estadi es 'jugando'
  const moverBarco = () => {
    if (state.estadoJuego !== 'jugando') return;
    if (pBarco.length > 0) {
      dispatch({ type: 'MOVER_BARCO' });
    }
  };

  return (
    <div className='relative min-h-screen bg-sky-200 overflow-hidden'>
      <Cloud className='top-10 left-10' size='medium' animation='float' />
      <Cloud className='top-10 left-1/3' size='large' animation='float' />
      <Cloud className='top-10 right-1/3' size='small' animation='float' />
      <Cloud className='top-20 right-20' size='large' animation='float-slow' />

      {/* isla izquierda*/}
      <div
        ref={islaIzquierdaRef}
        className='absolute left-0 bottom-60 w-90 h-40 bg-orange-200 border-3 border-dashed border-orange-300 rounded-md flex flex-col items-center justify-center gap-2 z-10 p-2 pb-15'
      >
        {/* canibales */}
        <div className='flex gap-2'>
          {pIzq
            .filter((p) => p.tipo === 'canibal')
            .map((personaje) => (
              <motion.img
                key={personaje.id}
                src={canibal}
                alt={personaje.tipo}
                className='w-16 cursor-grab active:cursor-grabbing'
                drag
                dragMomentum={false}
                dragElastic={0.1}
                dragSnapToOrigin={true}
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, personaje.id)
                }
                whileDrag={{ scale: 1.1, zIndex: 50 }}
              />
            ))}
        </div>
        {/* misioneros */}
        <div className='flex gap-2'>
          {pIzq
            .filter((p) => p.tipo === 'misionero')
            .map((personaje) => (
              <motion.img
                key={personaje.id}
                src={misionero}
                alt={personaje.tipo}
                className='w-15 cursor-grab active:cursor-grabbing'
                drag
                dragMomentum={false}
                dragElastic={0.1}
                dragSnapToOrigin={true}
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, personaje.id)
                }
                whileDrag={{ scale: 1.1, zIndex: 50 }}
              />
            ))}
        </div>
      </div>

      {/* isla derecha */}
      <div
        ref={islaDerechaRef}
        className='absolute right-0 bottom-60 w-90 h-40 bg-orange-200 border-3 border-dashed border-orange-300 rounded-md flex flex-col items-center justify-center gap-2 z-10 p-2 pb-15'
      >
        {/* canibales */}
        <div className='flex gap-2'>
          {pDer
            .filter((p) => p.tipo === 'canibal')
            .map((personaje) => (
              <motion.img
                key={personaje.id}
                src={canibal}
                alt={personaje.tipo}
                className='w-16 cursor-grab active:cursor-grabbing'
                drag
                dragMomentum={false}
                dragElastic={0.1}
                dragSnapToOrigin={true}
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, personaje.id)
                }
                whileDrag={{ scale: 1.1, zIndex: 50 }}
              />
            ))}
        </div>
        {/* misioneros */}
        <div className='flex gap-2'>
          {pDer
            .filter((p) => p.tipo === 'misionero')
            .map((personaje) => (
              <motion.img
                key={personaje.id}
                src={misionero}
                alt={personaje.tipo}
                className='w-15 cursor-grab active:cursor-grabbing'
                drag
                dragMomentum={false}
                dragElastic={0.1}
                dragSnapToOrigin={true}
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, personaje.id)
                }
                whileDrag={{ scale: 1.1, zIndex: 50 }}
              />
            ))}
        </div>
      </div>

      {/* barco */}
      <motion.div
        ref={barcoRef}
        className='absolute bottom-65 w-60 h-16 bg-amber-900 border-3 border-dashed rounded-2xl flex items-center justify-center gap-2 z-20'
        animate={{
          left: state.posicionBarco === 'izquierda' ? '33.5%' : '66.5%',
          x: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {pBarco.map((personaje) => (
          <motion.img
            key={personaje.id}
            src={personaje.tipo === 'canibal' ? canibal : misionero}
            alt={personaje.tipo}
            className='w-16 cursor-grab active:cursor-grabbing pb-20'
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragSnapToOrigin={true}
            onDragEnd={(event, info) =>
              handleDragEnd(event, info, personaje.id)
            }
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ))}
      </motion.div>

      {/* olas */}
      <div className='absolute bottom-0 left-0 w-full h-75 bg-gradient-to-t from-blue-600 to-blue-400 border-2 border-dashed border-blue-950 z-0'></div>

      {/* check estado del juego */}
      {state.estadoJuego === 'victoria' && (
        <div className='absolute left-1/2 -translate-x-1/2 top-32 bg-green-500 text-white text-4xl font-bold px-10 py-6 rounded-xl border-4 border-white shadow-xl z-50'>
          ¡Ganaste! Todos los personajes llegaron sanos a salvo.
        </div>
      )}
      {state.estadoJuego === 'derrota' && (
        <div className='absolute left-1/2 -translate-x-1/2 top-32 bg-red-600 text-white text-4xl font-bold px-10 py-6 rounded-xl border-4 border-white shadow-xl z-50'>
          ¡Perdiste! Los canibales se comieron a los misioneros.
        </div>
      )}

      {/* boton play again */}
      {(state.estadoJuego === 'victoria' ||
        state.estadoJuego === 'derrota') && (
        <Button
          className='bg-amber-400 text-white text-3xl border-2 border-dashed border-black px-13 py-8 font-semibold transition-all duration-300 hover:shadow-[8px_8px_0px_black] active:shadow-none cursor-pointer z-50 absolute left-1/2 -translate-x-1/2 top-70'
          onClick={() => dispatch({ type: 'PLAY_AGAIN' })}
        >
          Jugar de nuevo
        </Button>
      )}

      {/* botones abajo */}
      <Button
        className='bg-amber-400 text-white text-3xl border-2 border-dashed border-black px-13 py-8 font-semibold transition-all duration-300 hover:shadow-[8px_8px_0px_black] active:shadow-none cursor-pointer z-10 absolute left-1/2 -translate-x-1/2 bottom-35 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
        onClick={moverBarco}
        disabled={pBarco.length === 0 || state.estadoJuego !== 'jugando'}
      >
        Mover
      </Button>

      <Button
        className='bg-blue-400 text-white text-2xl border-2 border-dashed border-black px-8 py-5 font-semibold transition-all duration-300 hover:shadow-[8px_8px_0px_black] active:shadow-none cursor-pointer z-10 absolute left-1/2 -translate-x-1/2 bottom-20'
        onClick={() => setOpenModal(true)}
      >
        Reglas
      </Button>

      {/* modal */}
      <SpringModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  );
};
