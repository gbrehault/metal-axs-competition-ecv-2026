import Image from 'next/image';
// import AnimatedBackground from '@/app/components/AnimatedBackground';
import HomeLoader from '@/app/components/HomeLoader';
import PartnerSlider, { type Partner } from '@/app/components/PartnerSlider';
import InteractiveShape from '@/app/components/InteractiveShape';
import Logo from '@/app/assets/logo_metal_axs_2026.png';
// import StrongCircleRigth from '@/app/assets/strong-circle-rigth.png';
// import SmallCircleRigth from '@/app/assets/circle-small-rigth.png';
// import TriangleRigth from '@/app/assets/triangle-rigth.png';
// import ShapeCircleLeft from '@/app/assets/shape-left.png';

const partners: Partner[] = [
  { name: 'Association', italic: true },
  { name: 'Test' },
  { name: 'Test' },
  { name: 'organism' },
  { name: 'Test' },
  { name: 'Association', italic: true },
  { name: 'Test' },
];

export default function Home() {
  return (
    <>
      <HomeLoader />
      <section className="relative flex h-1000 w-screen pt-65 flex-col items-center justify-start overflow-hidden bg-tertiary">
        {/* <AnimatedBackground /> */}
        <InteractiveShape />

        <Image
          src={Logo}
          alt="Logo Metal AXS"
          width={200}
          height={200}
          className="relative z-20 mx-auto inverted-colors: invert-0 invert-[0.6] md:invert-[0.8]"
        />

        <p className="relative z-20 mt-4 w-full p-4 text-center font-secondary text-secondary md:w-1/2 md:p-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a dictum nisl, vel
          eleifend nibh. Morbi eu fermentum quam, ut bibendum felis. Pellentesque et dui ligula.
          Vivamus feugiat volutpat sapien ultrices laoreet. Donec ut tincidunt risus, porttitor
          molestie lacus. Etiam pellentesque lacus at molestie venenatis. Proin sit amet odio leo.
        </p>

        {/* <div className="absolute bottom-20 left-1/2">
          <Image
            src={StrongCircleRigth}
            alt="Strong Circle Right"
            width={2599}
            height={2399}
            className="z-10 blur-3xl"
          />
        </div>

        <div className="absolute top-120 right-20">
          <Image
            src={SmallCircleRigth}
            alt="Small Circle Right"
            width={500}
            height={499}
            className="z-10 blur-3xl"
          />
        </div>

        <div className="absolute bottom-40 left-150">
          <Image
            src={TriangleRigth}
            alt="Triangle Right"
            width={1700}
            height={1700}
            className="z-10 blur-3xl"
          />
        </div>

        <div className="absolute bottom-0 right-1/2">
          <Image
            src={ShapeCircleLeft}
            alt="Shape Circle Left"
            width={1000}
            height={1000}
            className="z-10 blur-3xl"
          />
        </div> */}

        <div className="relative z-20 w-full">
          <PartnerSlider partners={partners} label="Collaborateur Exemple" speed={25} />
        </div>
      </section>
    </>
  );
}
