import { Cloud as CloudIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloudProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  animation?: 'float' | 'float-slow' | 'none';
}

const Cloud = ({
  className,
  size = 'medium',
  animation = 'float',
}: CloudProps) => {
  const sizeStyles = {
    small: 80,
    medium: 120,
    large: 240,
  };

  const animationStyles = {
    float: 'animate-float',
    'float-slow': 'animate-float-slow',
    none: '',
  };

  return (
    <CloudIcon
      size={sizeStyles[size]}
      className={cn(
        'absolute text-white drop-shadow-[8px_8px_0px_black] ',
        animationStyles[animation],
        className
      )}
      strokeWidth={1.5}
      fill='white'
    />
  );
};

export default Cloud;
