'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DIAGNOSTIC_QUESTIONS } from '@/app/data/audits/auditsdata';
import gsap from 'gsap';
import { X, QuestionMarkIcon, DownloadSimpleIcon } from '@phosphor-icons/react';

type AuditAnswers = Record<number, string>;

export default function AuditResultat() {
  const [answers] = useState<AuditAnswers>(() => {
    if (typeof window === 'undefined') return {};

    const storedAnswers = window.localStorage.getItem('auditAnswers');
    return storedAnswers ? (JSON.parse(storedAnswers) as AuditAnswers) : {};
  });
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<
    (typeof DIAGNOSTIC_QUESTIONS)[number] | null
  >(null);

  const problemQuestions = DIAGNOSTIC_QUESTIONS.filter((question) => {
    const answer = answers[question.id];
    return answer && answer !== 'Oui';
  });

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
    <>
      <main className="mt-40 md:mt-20 min-h-screen bg-bg px-4 py-12 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 md:gap-8">
          <h1 className="text-balance text-center text-3xl text-secondary md:text-4xl">
            Félicitations, vos premiers pas dans l’accessibilité sont terminés !
          </h1>

          <h5 className="text-balance text-center text-lg text-secondary/50 md:text-2xl">
            Vous êtes concernés par les notions <br /> d’accessibilité suivantes :
          </h5>
          <div className="flex w-full items-center justify-center">
            <Link
              href="/faire-un-audit"
              className="mb-4 flex w-full max-w-3xl items-center justify-center gap-2 bg-secondary/5 px-4 py-4 text-center text-secondary md:mb-6 md:px-6"
            >
              Télécharger votre résumé en PDF <DownloadSimpleIcon size={20} />
            </Link>
          </div>
          {problemQuestions.map((question) => (
            <article key={question.id} className="flex flex-col gap-4">
              <p className="flex w-fit items-center justify-center bg-secondary/5 px-4 py-2 text-base font-regular text-secondary md:text-xl">
                Question {question.id}
              </p>

              <div className="flex w-full flex-col gap-4 bg-tertiary p-4 md:flex-row md:p-5">
                <div className="relative min-h-[220px] w-full shrink-0 overflow-hidden md:min-h-0 md:w-56 lg:w-72">
                  <Image
                    src={question.imageSrc}
                    alt={question.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="flex flex-1 flex-col items-start justify-end">
                  <span className="mb-2 rounded-4xl border border-primary text-primary">
                    <QuestionMarkIcon size={20} />
                  </span>
                  <h5 className="mb-2 text-lg font-regular text-secondary md:text-xl">
                    {question.title}
                  </h5>
                  <p className="text-sm leading-relaxed text-secondary/80 md:text-base">
                    {question.shortDescription}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveQuestion(question);
                      setIsInfoOpen(true);
                    }}
                    className="text-primary underline mt-2 text-left"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </article>
          ))}

          <Link
            href="/"
            onClick={() => localStorage.removeItem('auditAnswers')}
            className="w-full bg-secondary px-6 py-4 text-center text-tertiary"
          >
            Revenir à l’accueil
          </Link>
        </div>
      </main>

      {isInfoOpen && activeQuestion && (
        <div
          className="fixed inset-0 z-10000 flex items-end justify-center bg-black/40 md:items-stretch md:justify-end"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="h-190 md:h-[88vh] w-full overflow-y-auto bg-tertiary text-secondary shadow-2xl md:h-full md:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeQuestion.article.imageSrc}
              alt={activeQuestion.title}
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
              <h4 className="mb-4 text-xl font-regular md:text-2xl">
                {activeQuestion.article.title}
              </h4>

              <p className="mb-6 text-base leading-relaxed md:text-lg">
                {activeQuestion.article.intro}
              </p>

              {activeQuestion.article.sections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h4 className="mb-2 text-xl font-regular text-secondary md:text-2xl">
                    {section.title}
                  </h4>

                  <p className="text-base leading-relaxed md:text-lg">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
