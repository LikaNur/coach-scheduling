export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
        <p className="text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} Cloudathlete. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
