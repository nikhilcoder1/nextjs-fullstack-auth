export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg px-10 py-8 space-y-3">
        <h1 className="text-2xl font-semibold text-gray-100 text-center">
          Profile Page
        </h1>

        <h2 className="text-gray-300 text-center">
          User ID:{" "}
          <span className="font-mono text-blue-400 font-semibold">
            {id}
          </span>
        </h2>
      </div>
    </div>
  );
}