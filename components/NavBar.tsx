// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-500 p-4 flex items-center">
       <div className="mr-4">
        {/* Cambia la ruta según la ubicación de tu logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={200} height={50} />
        </Link>
      </div>
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
