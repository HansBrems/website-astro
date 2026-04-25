import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button';

describe('Button', () => {
  it('renders the button text', () => {
    render(<Button text="Click me" onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', async () => {
    const handler = vi.fn();
    render(<Button text="Click me" onClick={handler} />);
    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handler).toHaveBeenCalledOnce();
  });
});
