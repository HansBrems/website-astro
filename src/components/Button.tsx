interface Props {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: Props) {
  return (
    <button
      className={`rounded-md border-b-[1px] border-solid border-stone-500 bg-teal-500 p-2 text-xs font-bold text-white hover:bg-teal-600 dark:bg-stone-800 dark:text-stone-100`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
