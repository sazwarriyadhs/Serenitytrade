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
      height: 60, // Original aspect ratio reference
      className: 'h-14 w-auto', // Significantly larger in header (was h-[48px], now h-[56px] in a 64px header)
    },
    large: {
      width: 275,
      height: 120, // Original aspect ratio reference
      className: 'h-[120px] w-auto', // Significantly larger for splash/login pages (was h-[80px])
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
