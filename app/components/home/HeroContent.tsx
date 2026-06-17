import Button from '@/app/components/ui/Button';

export default function HeroContent() {
  return (
    <div className="relative z-10 px-6 md:px-24 pt-28 md:pt-56 w-full md:ml-auto md:max-w-screen-2xl flex flex-col items-start md:w-fit">
      <h1
        className="font-primary text-[clamp(2.5rem,8vw,6rem)] text-secondary flex flex-col gap-2 leading-none"
      >
        <span className="block leading-none">
          <span className="bg-white px-2 py-1 inline-block">Metal Axs<span className="text-[clamp(20px,3vw,32px)]">©</span></span>
        </span>
        <span className="block leading-none">
          <span className="bg-white px-2 py-1 inline-block">rend vos festivals</span>
        </span>
        <span className="block leading-none">
          <span className="bg-white px-2 py-1 text-primary inline-block">accessibles</span>
          <span className="bg-white px-2 py-1 inline-block ml-1">à tous</span>
        </span>
      </h1>

      <div className="flex flex-wrap items-center gap-3 mt-8">
        <Button variant="disabled" size="lg" disabled>CTA 2</Button>
        <Button href="/faire-un-audit" variant="secondary" size="lg">→ RÉALISER UN AUDIT</Button>
      </div>
    </div>
  );
}
