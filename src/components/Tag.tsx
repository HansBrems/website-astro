export interface Props {
  color: string;
  name: string;
}

export default function Tag({ color, name }: Props) {
  return (
    <div
      className={`flex items-center rounded-md border-b-[1px] border-solid bg-stone-100 p-2 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-100 border-${color}-500 dark:border-${color}-500 `}
    >
      {name}
    </div>
  );
}
