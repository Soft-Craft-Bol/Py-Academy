import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '@/app/pages/RegisterPage';
import { vi } from 'vitest';

vi.mock('@/shared/hooks/useAuth', () => ({
  useRegister: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock('@/shared/ui/atoms/Input', () => ({
  __esModule: true,
  default: (props) => <input {...props} data-testid={`input-${props.name}`} />,
}));

vi.mock('@/shared/ui/atoms/Button', () => ({
  __esModule: true,
  default: (props) => <button {...props}>{props.children}</button>,
}));
/* cambio */
vi.mock('@/shared/ui/molecules/profile/ProfileImageUpload', () => ({
  __esModule: true,
  default: ({ onChange }) => (
    <input
      type="file"
      data-testid="profile-upload"
      onChange={(e) => onChange(e.target.files?.[0])}
    />
  ),
}));

describe('RegisterPage', () => {
  it('debe renderizar el formulario correctamente', () => {
    render(<RegisterPage />);

    expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
    expect(screen.getByText('Estudiante')).toBeInTheDocument();
    expect(screen.getByText('Docente')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('debe mostrar el campo de materia solo cuando el rol es DOCENTE', () => {
    render(<RegisterPage />);

    expect(screen.queryByLabelText(/Materia/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Docente/i }));

    expect(screen.getByLabelText(/Materia/i)).toBeInTheDocument();
  });

  it('debe mantener el campo materia oculto cuando el rol es ESTUDIANTE', () => {
    render(<RegisterPage />);
    expect(screen.queryByLabelText(/Materia/i)).not.toBeInTheDocument();
  });

  it('debe permitir cambiar entre Estudiante y Docente', () => {
    render(<RegisterPage />);

    const estudianteBtn = screen.getByRole('button', { name: 'Estudiante' });
    const docenteBtn = screen.getByRole('button', { name: 'Docente' });

    // Cambiar a Docente y verificar campo materia
    fireEvent.click(docenteBtn);
    expect(screen.getByLabelText(/Materia/i)).toBeInTheDocument();

    // Cambiar a Estudiante y verificar que desaparece
    fireEvent.click(estudianteBtn);
    expect(screen.queryByLabelText(/Materia/i)).not.toBeInTheDocument();
  });
});
