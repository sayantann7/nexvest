import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0c34] text-white p-8 text-center">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-4">Fund House Not Found</h1>
        <p className="text-white/70 mb-6">The fund house you are looking for does not exist or has no data.</p>
        <Link href="/mutual-funds" className="text-teal-300 underline hover:text-teal-200">Back to Mutual Funds</Link>
      </div>
    </div>
  );
}
