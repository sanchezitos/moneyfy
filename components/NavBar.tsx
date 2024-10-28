// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/movements">Gestión de Movimientos</Link>
        </li>
        <li>
          <Link href="/users">Gestión de Usuarios</Link>
        </li>
        <li>
          <Link href="/reports">Reportes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
