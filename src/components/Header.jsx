export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">MovieMint</p>
            <h1 className="text-xl font-semibold text-white">Discover your next favorite film</h1>
          </div>
          <div className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-sm text-zinc-300">
            Powered by TMDb
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-800 bg-[linear-gradient(135deg,_rgba(245,158,11,0.25),_rgba(255,255,255,0.05))] p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">Now Streaming</p>
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                MovieMint
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                Find trending stories, discover hidden gems, and jump into your next movie night.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200">
              Browse popular titles instantly
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}