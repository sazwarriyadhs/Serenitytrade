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
      width: 260,
      height: 113,
      className: 'h-14 w-auto', // Max height for h-16 header
    },
    large: {
      width: 644,
      height: 280,
      className: 'h-[280px] w-auto', // Dramatically larger for splash/login
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
