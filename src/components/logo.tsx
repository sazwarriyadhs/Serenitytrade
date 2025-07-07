import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({
  size = 'default',
  className,
}: {
  size?: 'default' | 'large';
  className?: string;
}) {
  const sizes = {
    default: {
      width: 160,
      height: 70,
      className: 'h-16 w-auto', // Fills the header height
    },
    large: {
      width: 365,
      height: 160, 
      className: 'h-[160px] w-auto', // Significantly larger for splash/login pages
    },
  };

  const config = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="Serenity AgriExport Hub Logo"
        width={config.width}
        height={config.height}
        priority
        className={cn(config.className, className)}
      />
    </div>
  );
}
