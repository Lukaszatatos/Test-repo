const availableSymbols = [
  "/images/cat.png",
  "/images/dog.png",
  "/images/paw.png",
  "/images/bone.png",
  "/images/fish.png",
];

const spinningSymbols = [
  ...availableSymbols,
  ...availableSymbols,
  ...availableSymbols,
];

type ReelProps = {
  symbol: string;
  isSpinning: boolean;
};

export function Reel({ symbol, isSpinning }: ReelProps) {
  return (
    <div className="h-48 w-48 overflow-hidden rounded-xl border-4 border-yellow-300 bg-white shadow-2xl ring-4 ring-yellow-600/30">
      {isSpinning ? (
        <div className="reel-strip">
          {spinningSymbols.map((currentSymbol, index) => (
            <div
              key={`${currentSymbol}-${index}`}
              className="flex h-48 w-48 items-center justify-center p-2"
            >
              <img
                src={currentSymbol}
                alt="symbol"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-48 w-48 items-center justify-center p-2">
          <img
            src={symbol}
            alt="symbol"
            className="h-full w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}