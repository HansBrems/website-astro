import { describe, expect, it } from 'vitest';

import type { Category } from '../../domain/models/category';
import { getTagColor } from './tag-helper';

const categories: Category[] = [
  { id: 1, name: 'back-end', color: 'teal', tags: ['C#', 'Go'] },
  { id: 2, name: 'front-end', color: 'pink', tags: ['React', 'Angular'] },
  { id: 3, name: 'other', color: 'stone', tags: [] },
];

describe('getTagColor', () => {
  it('returns the color of the category that owns the tag', () => {
    expect(getTagColor(categories, 'C#')).toBe('teal');
    expect(getTagColor(categories, 'React')).toBe('pink');
  });

  it('falls back to the "other" category color for an unknown tag', () => {
    expect(getTagColor(categories, 'unknown-tag')).toBe('stone');
  });

  it('returns "stone" when the tag is unknown and no "other" category exists', () => {
    const noOther: Category[] = [
      { id: 1, name: 'back-end', color: 'teal', tags: ['C#'] },
    ];
    expect(getTagColor(noOther, 'unknown-tag')).toBe('stone');
  });
});
