import Image from 'next/image';

export default function Cardtest() {
  return (
    <div className="card">
      <h2>Card Test</h2>
      <p>This is a test card component.</p>
      <Image
        src="https://fr.wikipedia.org/wiki/British_shorthair"
        alt="Test Image"
        width={300}
        height={200}
      />
      <object data="" type=""></object>
    </div>
  );
}
