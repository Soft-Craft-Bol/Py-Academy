import { FiMenu } from 'react-icons/fi';

export function MobileMenuButton({ onToggleMenu }) {
  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <button onClick={onToggleMenu} className="p-2 bg-transparent rounded focus:outline-none">
        <FiMenu className="text-2xl text-white" />
      </button>
    </div>
  );
}
