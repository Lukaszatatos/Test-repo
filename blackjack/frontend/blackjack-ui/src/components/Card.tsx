type CardProps = {
  value: string;
};

export function Card({ value }: CardProps) {
  return (
    <div className="flex h-32 w-24 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-3xl font-bold text-black shadow-lg">
      {value}
    </div>
  );
}