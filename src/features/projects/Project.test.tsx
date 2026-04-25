import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Category } from '../../domain/models/category';
import type { Project as ProjectModel } from '../../domain/models/project';
import Project from './Project';

const categories: Category[] = [
  { id: 1, name: 'back-end', color: 'teal', tags: ['C#'] },
  { id: 2, name: 'front-end', color: 'pink', tags: ['React'] },
  { id: 3, name: 'other', color: 'stone', tags: [] },
];

const baseProject: ProjectModel = {
  id: 1,
  title: 'Full-Stack Developer',
  company: 'Acme Corp',
  description: 'Building great things.',
  from: new Date('2022-01-01'),
  to: new Date('2023-06-01'),
  tags: ['React', 'C#'],
};

describe('Project', () => {
  it('renders the company name', () => {
    render(<Project project={baseProject} categories={categories} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders the project title', () => {
    render(<Project project={baseProject} categories={categories} />);
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Project project={baseProject} categories={categories} />);
    expect(screen.getByText('Building great things.')).toBeInTheDocument();
  });

  it('renders the formatted date range', () => {
    render(<Project project={baseProject} categories={categories} />);
    expect(screen.getByText('Jan 2022 - Jun 2023')).toBeInTheDocument();
  });

  it('shows "Present" when to is null', () => {
    const ongoing: ProjectModel = { ...baseProject, to: null };
    render(<Project project={ongoing} categories={categories} />);
    expect(screen.getByText(/Present/)).toBeInTheDocument();
  });

  it('renders all tags when there are 5 or fewer', () => {
    render(<Project project={baseProject} categories={categories} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
  });

  it('shows only 5 tags and a "Show all" button when there are more than 5', () => {
    const manyTags: ProjectModel = {
      ...baseProject,
      tags: ['React', 'C#', 'Go', 'Angular', 'TypeScript', 'SQL Server'],
    };
    render(<Project project={manyTags} categories={categories} />);
    expect(screen.queryByText('SQL Server')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show all' }),
    ).toBeInTheDocument();
  });

  it('shows all tags after clicking "Show all"', async () => {
    const manyTags: ProjectModel = {
      ...baseProject,
      tags: ['React', 'C#', 'Go', 'Angular', 'TypeScript', 'SQL Server'],
    };
    render(<Project project={manyTags} categories={categories} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show all' }));
    expect(screen.getByText('SQL Server')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show less' }),
    ).toBeInTheDocument();
  });

  it('hides extra tags again after clicking "Show less"', async () => {
    const manyTags: ProjectModel = {
      ...baseProject,
      tags: ['React', 'C#', 'Go', 'Angular', 'TypeScript', 'SQL Server'],
    };
    render(<Project project={manyTags} categories={categories} />);
    await userEvent.click(screen.getByRole('button', { name: 'Show all' }));
    await userEvent.click(screen.getByRole('button', { name: 'Show less' }));
    expect(screen.queryByText('SQL Server')).not.toBeInTheDocument();
  });

  it('does not show the toggle button when showAllTags is true', () => {
    const manyTags: ProjectModel = {
      ...baseProject,
      tags: ['React', 'C#', 'Go', 'Angular', 'TypeScript', 'SQL Server'],
    };
    render(<Project project={manyTags} categories={categories} showAllTags />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('SQL Server')).toBeInTheDocument();
  });
});
