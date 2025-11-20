export function Badge({ className = "", children }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-xs font-medium px-2 py-1 ${className}`}
    >
      {children}
    </span>
  );
}
