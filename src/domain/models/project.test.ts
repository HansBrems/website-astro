import { describe, expect, it } from 'vitest';

import projectsData from '../../data/projects.json';
import { projectSchema } from './project';

const valid = {
  id: 1,
  title: 'Full-Stack Developer',
  company: 'Acme',
  description: 'Building things.',
  from: '2022-01-01T00:00:00.000Z',
  to: '2023-01-01T00:00:00.000Z',
  tags: ['React', 'TypeScript'],
};

describe('projectSchema', () => {
  it('parses a valid object', () => {
    expect(() => projectSchema.parse(valid)).not.toThrow();
  });

  it('coerces "from" string to a Date instance', () => {
    const result = projectSchema.parse(valid);
    expect(result.from).toBeInstanceOf(Date);
  });

  it('transforms "to" string to a Date instance', () => {
    const result = projectSchema.parse(valid);
    expect(result.to).toBeInstanceOf(Date);
  });

  it('transforms "to: null" to null', () => {
    const result = projectSchema.parse({ ...valid, to: null });
    expect(result.to).toBeNull();
  });

  it('throws when id is missing', () => {
    const { id, ...rest } = valid;
    expect(() => projectSchema.parse(rest)).toThrow();
  });

  it('throws when title is missing', () => {
    const { title, ...rest } = valid;
    expect(() => projectSchema.parse(rest)).toThrow();
  });

  it('throws when company is missing', () => {
    const { company, ...rest } = valid;
    expect(() => projectSchema.parse(rest)).toThrow();
  });

  it('throws when description is missing', () => {
    const { description, ...rest } = valid;
    expect(() => projectSchema.parse(rest)).toThrow();
  });

  it('throws when from is missing', () => {
    const { from, ...rest } = valid;
    expect(() => projectSchema.parse(rest)).toThrow();
  });

  it('throws when to is missing', () => {
    const { to, ...rest } = valid;
    expect(() => projectSchema.parse(rest)).toThrow();
  });
});

describe('data integrity — projects.json', () => {
  it('every entry passes projectSchema', () => {
    for (const entry of projectsData) {
      expect(() => projectSchema.parse(entry)).not.toThrow();
    }
  });
});
