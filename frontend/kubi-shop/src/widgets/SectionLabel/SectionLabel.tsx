import line from '@/assets/image/line.png'
// import type { ReactNode } from "react";

export const SectionLabel = ({ title }: { title: string }) => {
  return (
    <div className="mb-10 flex items-center gap-4">
      <p className="justify-start text-neutral-800 text-3xl font-extralight font-['Outfit'] uppercase tracking-widest">
        {title}
      </p>

      <img
        className="min-w-0 flex-1 object-cover"
        src={line}
        alt=""
      />
    </div>
  )
}
