import type { CategoryColor } from '@/schemas/category';

export interface Props {
  color: CategoryColor;
  label: string;
}

const borderColors: Record<CategoryColor, string> = {
  teal: 'border-teal-500',
  pink: 'border-pink-500',
  stone: 'border-stone-500',
};

export default function Tag({ color, label }: Props) {
  return (
    <div className={`${borderColors[color]} rounded-md border-b`}>
      <div
        className={`rounded-md border border-b-0 border-neutral-300 bg-white p-2 text-xs font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200`}
      >
        {label}
      </div>
    </div>
  );
}
