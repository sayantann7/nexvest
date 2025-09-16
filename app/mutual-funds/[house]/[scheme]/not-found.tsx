import Link from 'next/link';
export default function NotFoundScheme() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0c34] text-white p-8 text-center">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-4">Scheme Not Found</h1>
        <p className="text-white/70 mb-6">The scheme you are looking for does not exist in this fund house.</p>
        <Link href="/mutual-funds" className="text-teal-300 underline hover:text-teal-200">Back to Mutual Funds</Link>
      </div>
    </div>
  );
}
