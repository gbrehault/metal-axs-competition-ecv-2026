"use client";

import Image from "next/image";

export type Partner = {
  name: string;
  logo?: string;
  italic?: boolean;
};

type Props = {
  partners: Partner[];
  label?: string;
  speed?: number;
};

export default function PartnerSlider({ partners, label, speed = 30 }: Props) {
  // 4 copies so the loop never shows a gap regardless of viewport width
  const items = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative z-10 py-4">
        {label && (
          <p className="text-center text-white/80 text-sm tracking-widest uppercase mb-3 font-primary">
            {label}
          </p>
        )}

        <div className="overflow-hidden">
          <div
            className="flex items-center will-change-transform"
            style={{
              width: "max-content",
              animation: `marquee ${speed}s linear infinite`,
            }}
          >
            {items.map((partner, i) => (
              <span key={i} className="flex items-center shrink-0">
                {partner.logo ? (
                  <span className="flex items-center h-8 px-8">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={32}
                      className="h-6 w-auto object-contain brightness-0 invert"
                    />
                  </span>
                ) : (
                  <span
                    className="px-6 text-2xl text-white"
                    style={
                      partner.italic
                        ? { fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }
                        : { fontFamily: "var(--font-primary)", fontWeight: 400 }
                    }
                  >
                    {partner.name}
                  </span>
                )}
                <span className="text-white/40 text-xl select-none">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
