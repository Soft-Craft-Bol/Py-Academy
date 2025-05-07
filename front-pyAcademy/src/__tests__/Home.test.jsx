import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Home from '../pages/home/Home';

describe('Home Component', () => {
    it('renders without crashing', () => {
      render(<Home />);
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  
    it('displays the HeroSection', () => {
      render(<Home />);
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    });
  
    it('renders all 3 features in the FeatureGrid', () => {
      render(<Home />);
      
    });
  });