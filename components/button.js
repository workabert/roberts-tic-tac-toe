export function Button({ children, onClick, variant = "default" }) {
  const base = "px-4 py-2 rounded font-semibold";
  const styles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
