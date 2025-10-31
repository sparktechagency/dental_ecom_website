export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 animate-spin text-[#136BFB]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="text-base">Loading...</span>
      </div>
    </div>
  );
}
