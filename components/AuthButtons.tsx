// components/AuthButtons.tsx
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {
    const { data: session } = useSession();

    return session ? (
        <div>
            <p>Hola, {session.user?.name}</p>

            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000' })}>
                Cerrar sesión
            </button>

        </div>
    ) : (
        <button onClick={() => signIn('auth0')} className="bg-purple-600 text-white px-4 py-2 rounded">
            Iniciar sesión
        </button>
    );
};

export default AuthButtons;
