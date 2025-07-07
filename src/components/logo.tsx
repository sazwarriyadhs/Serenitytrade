import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/images/logo.png" alt="Serenity AgriExport Hub Logo" width={32} height={32} className="h-8 w-8" />
    </div>
  );
}
