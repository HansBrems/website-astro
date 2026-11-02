export interface Props {
  color: string;
  label: string;
}

export default function Tag({ color, label }: Props) {
  return (
    <div className={`border-${color}-500 rounded-md border-b`}>
      <div
        className={`rounded-md border border-b-0 border-stone-300 bg-white p-2 text-[13px]/4 font-bold md:text-sm/4 text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200`}
      >
        {label}
      </div>
    </div>
  );
}
