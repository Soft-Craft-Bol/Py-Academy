import { render, screen, fireEvent } from '@testing-library/react';
import CourseDashboard from '@/pages/ExplorateCourses/CourseDashboard';
import React from 'react';

// Mock de imágenes para evitar errores de importación
vi.mock('@/assets/course/Variables de python.png', () => ({ default: 'var-python-mock' }));
vi.mock('@/assets/course/Estructuras de control.png', () => ({ default: 'estructura-mock' }));
vi.mock('@/assets/course/Nuevo modulo.png', () => ({ default: 'nuevo-modulo-mock' }));
vi.mock('@/assets/course/Webinars.png', () => ({ default: 'webinars-mock' }));

describe('CourseDashboard', () => {
  it('renderiza el header y la pestaña de prácticas por defecto', () => {
    render(<CourseDashboard />);
    expect(screen.getByText(/curso: desarrollo web/i)).toBeInTheDocument();
    expect(screen.getByText(/práctica 1: variables en python/i)).toBeInTheDocument();
    expect(screen.getByText(/práctica 2: estructuras de control/i)).toBeInTheDocument();
  });

  it('cambia a la pestaña de noticias al hacer clic', () => {
    render(<CourseDashboard />);
    fireEvent.click(screen.getByRole('button', { name: /noticias/i }));
    expect(screen.getByText(/nuevo módulo de ia disponible/i)).toBeInTheDocument();
    expect(screen.getByText(/webinar de desarrollo web este viernes/i)).toBeInTheDocument();
  });

  it('cambia a la pestaña de avisos al hacer clic', () => {
    render(<CourseDashboard />);
    fireEvent.click(screen.getByRole('button', { name: /avisos/i }));
    expect(screen.getByText(/el sistema estará en mantenimiento/i)).toBeInTheDocument();
    expect(screen.getByText(/entrega de notas el 15\/06/i)).toBeInTheDocument();
  });

  it('cambia a la pestaña de materiales al hacer clic', () => {
    render(<CourseDashboard />);
    fireEvent.click(screen.getByRole('button', { name: /materiales/i }));
    expect(screen.getByText(/slides semana 1/i)).toBeInTheDocument();
    expect(screen.getByText(/código de ejemplo/i)).toBeInTheDocument();
  });
});
