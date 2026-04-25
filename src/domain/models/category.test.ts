import { describe, expect, it } from 'vitest';

import categoriesData from '../../data/categories.json';
import { categorySchema } from './category';

const valid = {
  id: 1,
  name: 'back-end',
  color: 'teal',
  tags: ['C#', 'Go'],
};

describe('categorySchema', () => {
  it('parses a valid object', () => {
    expect(() => categorySchema.parse(valid)).not.toThrow();
  });

  it('throws when id is missing', () => {
    const { id, ...rest } = valid;
    expect(() => categorySchema.parse(rest)).toThrow();
  });

  it('throws when name is missing', () => {
    const { name, ...rest } = valid;
    expect(() => categorySchema.parse(rest)).toThrow();
  });

  it('throws when color is missing', () => {
    const { color, ...rest } = valid;
    expect(() => categorySchema.parse(rest)).toThrow();
  });

  it('throws when tags is missing', () => {
    const { tags, ...rest } = valid;
    expect(() => categorySchema.parse(rest)).toThrow();
  });

  it('throws when tags contains a non-string value', () => {
    expect(() => categorySchema.parse({ ...valid, tags: [1, 2] })).toThrow();
  });
});

describe('data integrity — categories.json', () => {
  it('every entry passes categorySchema', () => {
    for (const entry of categoriesData) {
      expect(() => categorySchema.parse(entry)).not.toThrow();
    }
  });
});
