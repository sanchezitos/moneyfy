/// <reference types="jest" />

import { render, screen } from '@testing-library/react';
import AuthButtons from '@/components/AuthButtons';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('AuthButtons', () => {
  it('debe mostrar el botón de Login cuando el usuario no está autenticado', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    render(<AuthButtons />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('debe mostrar el botón de Logout cuando el usuario está autenticado', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'User' } },
      status: 'authenticated',
    });
    render(<AuthButtons />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
