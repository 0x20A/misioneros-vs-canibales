import { useState } from 'react';
import { Link } from 'react-router';
import { SpringModal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import Cloud from '@/components/cloud';
import logo from '../assets/logo-2d.png';

export const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='bg-gradient-to-bl bg-sky-200 min-h-screen flex flex-col items-center overflow-hidden'>
      <Cloud className='top-10 left-10' size='medium' animation='float' />
      <Cloud className='top-10 left-1/3' size='large' animation='float' />
      <Cloud className='top-20 right-20' size='large' animation='float-slow' />
      <Cloud className='bottom-20 left-1/4' size='small' animation='float' />
      <Cloud
        className='bottom-32 right-1/3'
        size='large'
        animation='float-slow'
      />
      <Cloud className='top-70 left-60' size='large' animation='float' />

      {/* logo */}
      <img
        className='w-[275px] z-10 mt-10'
        src={logo}
        alt='Misioneros vs Canibales'
      />

      {/* botones */}
      <Link to='/misioneros-vs-canibales' className='z-10 mt-40'>
        <Button className='bg-amber-400 text-white text-3xl border-2 border-dashed border-black px-13 py-8 font-semibold transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none cursor-pointer z-10'>
          Jugar
        </Button>
      </Link>

      <Button
        className='bg-blue-400 text-white text-2xl border-2 border-dashed border-black px-8 py-5 font-semibold transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none cursor-pointer mt-5 z-10'
        onClick={() => setOpenModal(true)}
      >
        Reglas
      </Button>

      {/* modal */}
      <SpringModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  );
};
