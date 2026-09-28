import { GameTable } from "./components/GameTable";

function App() {
  return (
    <div className="min-h-screen bg-green-950 text-white">
      <header className="border-b border-green-800 p-4">
        <h1 className="text-center text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]">
Jednoręki Bandyta
</h1>
      </header>

      <main className="mx-auto max-w-[1800px] px-8 py-6">
        <GameTable />
      </main>
    </div>
  );
}

export default App;