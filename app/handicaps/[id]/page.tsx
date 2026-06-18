import { notFound } from 'next/navigation';
import { getHandicapById, HANDICAPS_DATA } from '@/app/data/handicaps/handicapsData';
import HandicapDetailView from '@/app/components/handicap/HandicapDetailView';
import FooterLight from '@/app/components/FooterLight';

export function generateStaticParams() {
  return HANDICAPS_DATA.map((h) => ({ id: h.id }));
}

export default async function HandicapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const handicap = getHandicapById(id);

  if (!handicap) notFound();

  return (
    <main>
      <HandicapDetailView handicap={handicap} />
      <FooterLight />
    </main>
  );
}
