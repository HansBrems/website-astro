import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Tag from './Tag';

describe('Tag', () => {
  it('renders the label text', () => {
    render(<Tag label="React" color="teal" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('applies the dynamic border color class based on the color prop', () => {
    const { container } = render(<Tag label="React" color="teal" />);
    expect(container.firstChild).toHaveClass('border-teal-500');
  });

  it('applies the correct border class for a different color', () => {
    const { container } = render(<Tag label="Angular" color="pink" />);
    expect(container.firstChild).toHaveClass('border-pink-500');
  });
});
