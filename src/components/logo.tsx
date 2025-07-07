import Image from 'next/image';

export function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const sizes = {
    default: {
      width: 40,
      height: 40,
      className: "h-10 w-10"
    },
    large: {
      width: 200,
      height: 200,
      className: "h-48 w-48"
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
        className={config.className}
      />
    </div>
  );
}
