
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
      width: 138,
      height: 60, // rasio 2.3:1
      className: 'h-[48px] w-auto', // tinggi sesuai container header
    },
    large: {
      width: 240,
      height: 104,
      className: 'h-[80px] w-auto',
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
