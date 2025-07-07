import Image from 'next/image';
import { cn } from "@/lib/utils"

export function Logo({ size = 'default', className }: { size?: 'default' | 'large', className?: string }) {
  // Aspect ratio of the full logo is approx 2.3:1
  const sizes = {
    default: {
      width: 92,
      height: 40,
      className: "h-10"
    },
    large: {
      width: 442,
      height: 192,
      className: "h-48"
    }
  };
  const config = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="Serenity AgriExport Hub Logo"
        width={config.width}
        height={config.height}
        className={cn(config.className, "w-auto", className)}
      />
    </div>
  );
}
