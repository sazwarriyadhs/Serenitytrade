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
      width: 115,
      height: 50,
      className: 'h-10 w-auto',
    },
    large: {
      width: 240,
      height: 120,
      className: 'h-[120px] w-[240px]',
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
        sizes="(max-width: 768px) 120px, 240px"
        className={cn(config.className, className)}
      />
    </div>
  );
}
