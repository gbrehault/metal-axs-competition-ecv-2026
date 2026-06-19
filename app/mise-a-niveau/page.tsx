'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckIcon, X, CaretLeftIcon } from '@phosphor-icons/react';
import { DIAGNOSTIC_QUESTIONS } from '@/app/data/audits/auditsdata';
import Image from 'next/image';
import { QuestionMarkIcon } from '@phosphor-icons/react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function Audit() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<number, string>>({});
  const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInfoOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { x: 500, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
      );
    }
  }, [isInfoOpen]);

  const closeModal = () => {
    if (!modalRef.current) {
      setIsInfoOpen(false);
      return;
    }

    gsap.to(modalRef.current, {
      x: 500,
      opacity: 0,
      duration: 1,
      ease: 'power3.in',
      onComplete: () => setIsInfoOpen(false),
    });
  };

  return (
    <div className="relative mt-40 md:mt-20 flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-bg px-4 py-12 sm:px-6 md:px-10 md:py-20 lg:px-16">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center md:gap-6">
        <div className="z-100 flex w-full max-w-3xl items-center justify-between gap-3">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion((prev) => prev - 1);
              }
            }}
            disabled={currentQuestion === 0}
            className="bg-secondary/20 p-2 text-secondary disabled:opacity-30"
          >
            <CaretLeftIcon size={20} />
          </button>
          <span className="flex-1 text-center text-base sm:text-lg md:text-2xl">
            Question {currentQuestion + 1}/{DIAGNOSTIC_QUESTIONS.length}
          </span>
          <div className="w-9 shrink-0" aria-hidden />
        </div>

        <h4 className="w-full max-w-3xl text-balance text-2xl leading-tight md:text-3xl">
          {question.question}
        </h4>

        {question.options.map((option) => (
          <label
            key={option}
            className={`flex w-150 max-w-3xl cursor-pointer items-start gap-3 p-3 text-left transition-all md:items-center md:p-4 ${
              selectedAnswer[question.id] === option
                ? 'border-primary bg-primary/10'
                : 'border-secondary/20 bg-secondary/5'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={selectedAnswer[question.id] === option}
              onChange={() =>
                setSelectedAnswer((prev) => ({
                  ...prev,

                  [question.id]: option,
                }))
              }
              className="hidden"
            />

            <div
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-all md:mt-0 ${
                selectedAnswer[question.id] === option
                  ? 'border-primary bg-primary text-white'
                  : 'border-secondary/40'
              }`}
            >
              {selectedAnswer[question.id] === option && <CheckIcon size={32} />}
            </div>

            <span className="w-full text-base leading-snug font-medium md:text-center md:text-lg">
              {option}
            </span>
          </label>
        ))}

        <div className="mt-4 flex w-full justify-center ite max-w-3xl gap-4">
          <button
            onClick={() => {
              const isLastQuestion = currentQuestion === DIAGNOSTIC_QUESTIONS.length - 1;
              if (isLastQuestion) {
                localStorage.setItem(
                  'auditAnswers',

                  JSON.stringify(selectedAnswer),
                );

                router.push('/mise-a-niveau-resultat');

                return;
              }
              setCurrentQuestion((prev) => prev + 1);
            }}
            disabled={!selectedAnswer[question.id]}
            className="w-170 bg-secondary p-3 text-tertiary items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentQuestion === DIAGNOSTIC_QUESTIONS.length - 1
              ? 'Voir mes résultats'
              : 'Continuer'}
          </button>
        </div>
      </div>
      <main className="mt-2 flex w-170 max-w-5xl flex-col gap-4 bg-tertiary p-4 md:mt-5 md:flex-row md:p-5">
        <div className="relative w-full shrink-0 overflow-hidden md:min-h-0 md:w-56 lg:w-72">
          <Image src={question.imageSrc} alt={question.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="flex w-full flex-1 flex-col items-start justify-end">
          <span className="mb-2 rounded-4xl border border-primary text-primary">
            <QuestionMarkIcon size={20} />
          </span>
          <div className="flex flex-col">
            <p className="mb-2 text-lg font-bold text-secondary">{question.title}</p>
            <p className="text-sm leading-relaxed text-secondary/80 md:text-base">
              {question.shortDescription}
            </p>
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              className="text-primary underline mt-2 text-left"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </main>
      {isInfoOpen && (
        <div
          className="fixed inset-0 z-10000 flex items-end justify-center bg-black/40 md:items-stretch md:justify-end"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="h-170 md:h-[88vh] w-full overflow-y-auto bg-tertiary text-secondary shadow-2xl md:h-full md:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={question.article.imageSrc}
              alt={question.title}
              width={600}
              height={280}
              className="h-52 w-full object-cover md:h-auto"
            />
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 mb-8 bg-tertiary p-2 text-secondary underline"
            >
              <X size={24} weight="bold" />
            </button>
            <div className="p-4 md:p-6">
              <h5 className="mb-4 text-xl font-regular md:text-2xl">{question.article.title}</h5>

              <p className="mb-6 text-base leading-relaxed md:text-lg">{question.article.intro}</p>

              {question.article.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h5 className="mb-2 text-xl font-regular text-secondary md:text-2xl">
                    {section.title}
                  </h5>

                  <p className="text-base leading-relaxed md:text-lg">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
