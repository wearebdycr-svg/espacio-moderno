import { siteConfig } from "@/config/site";

export function Stats() {
  return (
    <section className="border-y border-stone-800/80 bg-stone-900/40 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-sm font-medium text-stone-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
