import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpringModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-blue-400 to-sky-200 text-white p-6 rounded-lg w-full max-w-lg -default relative overflow-hidden border-2 border-dashed border-black shadow-[8px_8px_0px_black]'
          >
            <div className='relative z-10'>
              <h3 className='text-3xl font-bold text-center mb-2'>Reglas</h3>
              <p className='text-left mb-6'>
                <span className='font-bold'>Objetivo</span> <br />
                Ayuda a los 3 misioneros y 3 caníbales a cruzar el río usando un
                bote pequeño. <br /> <br />
                <span className='font-bold'>Reglas</span> <br />
                · El bote solo puede llevar máximo 2 personas a la vez <br /> ·
                Al menos una persona debe ir en el bote para moverlo <br /> · En
                ningún momento puede haber más caníbales que misioneros en
                ninguna orilla (o los caníbales se comerán a los misioneros){' '}
                <br /> · Todos deben cruzar al otro lado del río <br /> <br />{' '}
                <span className='font-bold'>¿Cómo Jugar?</span> <br /> ·
                Selecciona quién subirá al bote <br />· Presiona "Mover" para
                cruzar el río <br />· Planea cada movimiento
              </p>
              <div className='flex'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='bg-white text-black font-semibold w-full py-2 rounded cursor-pointer border-2 border-dashed border-black hover:shadow-[8px_8px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px]'
                >
                  ¡Entendido!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
