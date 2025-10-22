
export default function Footer() {
  return (
    <footer className="mt-8 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Shann — Built with React + Tailwind
      </div>
    </footer>
  );
}
