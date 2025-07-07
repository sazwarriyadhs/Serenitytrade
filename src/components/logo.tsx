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
      width: 240, // Larger width for header
      height: 104,
      className: 'h-12 w-auto', // Fit within a 48px header (h-12)
    },
    large: {
      width: 460, // Significantly larger for login/splash
      height: 200,
      className: 'h-[160px] w-auto',
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
