import type { Category } from '../shared/models/category';

export function getTagColor(categories: Category[], tagName: string): string {
  let category = categories.find((c) => c.tags.includes(tagName));
  if (!category) category = categories.find((c) => c.name === 'other');
  return category?.color || 'stone';
}
