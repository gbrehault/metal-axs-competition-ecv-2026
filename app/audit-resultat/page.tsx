'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DIAGNOSTIC_QUESTIONS } from '@/app/data/audits/auditsdata';
import gsap from 'gsap';
import { X, QuestionMarkIcon, DownloadSimpleIcon } from '@phosphor-icons/react';

type AuditAnswers = Record<number, string>;

export default function AuditResultat() {
  const [answers, setAnswers] = useState<AuditAnswers>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = DIAGNOSTIC_QUESTIONS[currentQuestion];
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<
    (typeof DIAGNOSTIC_QUESTIONS)[number] | null
  >(null);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('auditAnswers');

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

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
      <main className="min-h-screen bg-bg px-6 py-20 md:px-16 mt-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h1 className="text-4xl text-secondary text-center">
            Félicitations, vos premiers pas dans l’accessibilité sont terminés !
          </h1>

          <h5 className="text-center text-2xl text-secondary/50">
            Vous êtes concernés par les notions <br /> d’accessibilité suivantes :
          </h5>
          <div className="flex items-center justify-center w-full">
            <Link
              href="/faire-un-audit"
              className="w-150 bg-secondary/5 text-secondary flex items-center justify-center mb-10 px-6 gap-2 py-4 text-center"
            >
              Télécharger votre résumé en PDF <DownloadSimpleIcon size={20} />
            </Link>
          </div>
          {problemQuestions.map((question) => (
            <article key={question.id} className="flex flex-col gap-4">
              <p className="bg-secondary/5 text-secondary w-1/6 flex text-center items-center justify-center p-2 text-xl font-regular">
                Question {question.id}
              </p>

              <div className="flex w-full bg-tertiary p-4 gap-4">
                <div className="relative h-auto w-50 overflow-hidden">
                  <Image
                    src={question.imageSrc}
                    alt={question.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="flex flex-col items-start justify-end">
                  <span className="border-1 border-primary text-primary rounded-4xl mb-2">
                    <QuestionMarkIcon size={20} />
                  </span>
                  <h5 className="text-lg font-regular text-secondary mb-2">{question.title}</h5>
                  <p>{question.shortDescription}</p>

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
            className="w-full bg-secondary px-6 py-4 text-tertiary text-center"
          >
            Revenir à l’accueil
          </Link>
        </div>
      </main>

      {isInfoOpen && activeQuestion && (
        <div className="fixed inset-0 z-10000 flex justify-end bg-black/40" onClick={closeModal}>
          <div
            ref={modalRef}
            className="h-full w-full max-w-lg bg-tertiary text-secondary shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeQuestion.article.imageSrc}
              alt={activeQuestion.title}
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
              <h4 className="mb-4 text-2xl font-regular">{activeQuestion.article.title}</h4>

              <p className="mb-6 text-lg leading-relaxed">{activeQuestion.article.intro}</p>

              {activeQuestion.article.sections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h4 className="mb-2 text-2xl text-secondary font-regular">{section.title}</h4>

                  <p className="text-lg leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
