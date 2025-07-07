import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/images/logo.png" alt="Serenity AgriExport Hub Logo" width={24} height={24} className="h-6 w-6" />
      <span className="font-headline text-lg font-semibold">
        Serenity AgriExport Hub
      </span>
    </div>
  );
}
