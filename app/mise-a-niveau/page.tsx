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
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center mt-20 overflow-hidden bg-bg px-6 py-20 gap-4 md:px-16">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <div className="flex items-stretch justify-between w-120 z-100">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion((prev) => prev - 1);
              }
            }}
            disabled={currentQuestion === 0}
            className="bg-secondary/20 w-auto text-secondary p-2 disabled:opacity-30"
          >
            <CaretLeftIcon size={20} />
          </button>
          <span className="text-2xl -ml-10">
            Question {currentQuestion + 1}/{DIAGNOSTIC_QUESTIONS.length}
          </span>
          <div className="w-auto"></div>
        </div>

        <h4 className="text-3xl w-120">{question.question}</h4>

        {question.options.map((option) => (
          <label
            key={option}
            className={`

    flex items-center

    w-120

    p-2

    cursor-pointer

    border

    transition-all

    ${
      selectedAnswer[question.id] === option
        ? 'border-primary bg-primary/10'
        : 'border-secondary/20 bg-secondary/5'
    }

  `}
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
              className={`

      h-4 w-4

      rounded-sm

      border

      flex items-center justify-center

      transition-all

      ${
        selectedAnswer[question.id] === option
          ? 'bg-primary border-primary text-white'
          : 'border-secondary/40'
      }

    `}
            >
              {selectedAnswer[question.id] === option && <CheckIcon size={32} />}
            </div>

            <span className="text-lg font-medium text-center -ml-6 w-full">{option}</span>
          </label>
        ))}

        <div className="flex gap-4 mt-4">
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
            className="bg-secondary w-120 text-tertiary p-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentQuestion === DIAGNOSTIC_QUESTIONS.length - 1
              ? 'Voir mes résultats'
              : 'Continuer'}
          </button>
        </div>
      </div>
      <main className="flex w-150 bg-tertiary p-4 mt-5 gap-4">
        <div className="relative  h-auto w-50 overflow-hidden">
          <Image src={question.imageSrc} alt={question.title} fill className="object-cover" />

          {/* Contenu par-dessus */}

          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="flex w-1/1 flex-col items-start justify-end">
          <span className="border-1 border-primary text-primary rounded-4xl mb-2">
            <QuestionMarkIcon size={20} />
          </span>
          <div className="flex flex-col">
            <p className="text-lg font-bold text-secondary mb-2">{question.title}</p>
            <p>{question.shortDescription}</p>
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
        <div className="fixed inset-0 z-10000 flex justify-end bg-black/40" onClick={closeModal}>
          <div
            ref={modalRef}
            className="h-full w-full max-w-lg bg-tertiary text-secondary shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={question.article.imageSrc}
              alt={question.title}
              width={600}
              height={100}
              className="object-cover"
            />
            <button
              type="button"
              onClick={closeModal}
              className="mb-8 text-secondary bg-tertiary p-2 underline absolute top-4 right-4"
            >
              <X size={24} weight="bold" />
            </button>
            <div className="p-4">
              <h5 className="mb-4 text-2xl font-regular">{question.article.title}</h5>

              <p className="mb-6 text-lg leading-relaxed">{question.article.intro}</p>

              {question.article.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h5 className="mb-2 text-2xl text-secondary font-regular">{section.title}</h5>

                  <p className="text-lg leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
