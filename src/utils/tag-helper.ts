import { categories } from '../data/categories';

export function getTagColor(tagName: string): string {
  let category = categories.find((c) => c.tags.includes(tagName));
  if (!category) category = categories.find((c) => c.name === 'other');
  return category?.color || 'stone';
}
