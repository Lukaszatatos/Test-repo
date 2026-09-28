import { useEffect, useState } from "react";
import { Reel } from "./Reel";
import { Paytable } from "./Paytable";

const availableSymbols = [
"/images/cat.png",
"/images/dog.png",
"/images/paw.png",
"/images/bone.png",
"/images/fish.png",
];

function calculatePayout(symbols: string[]) {
  const counts: Record<string, number> = {};

  symbols.forEach((symbol) => {
    counts[symbol] = (counts[symbol] ?? 0) + 1;
  });

  const highestMatch = Math.max(...Object.values(counts));

  if (highestMatch === 5) return 100;
  if (highestMatch === 4) return 20;
  if (highestMatch === 3) return 5;

  return 0;
}

export function GameTable() {
  const initialSymbols = [
"/images/cat.png",
"/images/dog.png",
"/images/paw.png",
"/images/bone.png",
"/images/fish.png",
];

  const [symbols, setSymbols] = useState(initialSymbols);
  const [revealedSymbols, setRevealedSymbols] = useState(initialSymbols);
  const [isSpinning, setIsSpinning] = useState(false);
  const [credits, setCredits] = useState(100);
  const [stoppedReels, setStoppedReels] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  const payout = calculatePayout(symbols);

  const spin = () => {
    if (isSpinning || credits <= 0) return;
    const spinSound = new Audio("/sounds/spin.mp3");
    spinSound.play();

    setIsSpinning(true);
    setCredits((current) => current - 1);
    setStoppedReels([false, false, false, false, false]);

    const newSymbols = Array.from({ length: 5 }, () => {
      const randomIndex = Math.floor(
        Math.random() * availableSymbols.length
      );

      return availableSymbols[randomIndex];
    });

    setSymbols(newSymbols);

    newSymbols.forEach((symbol, index) => {
      setTimeout(() => {
        setRevealedSymbols((current) => {
          const updated = [...current];
          updated[index] = symbol;
          return updated;
        });

        setStoppedReels((current) => {
          const updated = [...current];
          updated[index] = true;
          return updated;
        });

        if (index === newSymbols.length - 1) {
          setIsSpinning(false);
        }
      }, (index + 1) * 500);
    });
  };

useEffect(() => {
if (!isSpinning && payout > 0) {
setCredits((current) => current + payout);
 
const sound =
payout === 100
? new Audio("/sounds/jackpot.mp3")
: new Audio("/sounds/win.mp3");
 
sound.play();
}
}, [isSpinning, payout]);

  return (
    <div className="min-h-[700px] rounded-2xl border-4 border-yellow-500 bg-green-700 p-12 shadow-[0_0_40px_rgba(234,179,8,0.3)]">


        <div className="mb-12 text-center text-6xl font-bold text-yellow-300">
        💰 Credits: {credits}
        </div>

      <div className="mb-12 flex gap-12">
        <div className="w-80">
        <Paytable />
        </div>
         
        <div className="flex-1">
            </div>
        <div className="mb-12 flex justify-center gap-8">
            </div>


        {revealedSymbols.map((symbol, index) => (
          <Reel
            key={index}
            symbol={symbol}
            isSpinning={!stoppedReels[index]}
          />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={spin}
          disabled={isSpinning || credits <= 0}
          className="rounded-xl bg-yellow-500 px-16 py-6 text-3xl font-bold text-black shadow-xl hover:bg-yellow-400"
        >
          {isSpinning ? "SPINNING..." : "SPIN"}
        </button>

        {!isSpinning && payout > 0 && (
          <div
            className={`mt-6 animate-pulse font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,1)] ${
            payout === 100 ? "text-7xl" : "text-5xl"
            }`}
            >
            {payout === 100
            ? "🔥 JACKPOT! +100 CREDITS 🔥"
            : `🎉 YOU WIN! +${payout} CREDITS`}
          </div>
        )}

        {!isSpinning && credits <= 0 && (
          <div className="mt-6 text-xl font-bold text-red-300">
            NO CREDITS
          </div>
        )}
      </div>
    </div>
  );
}