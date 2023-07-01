import WeatherSearch from "@/components/weather-search";

export default async function WeatherPage() {
  return (
    <main className={"w-full h-full flex flex-col items-center justify-between px-5 sm:px-16 pt-12 pb-16"}>
      <div className={"w-full max-w-6xl flex flex-col items-center justify-center gap-2 shadow-sm rounded-xl bg-zinc-200"}>
        <WeatherSearch />
      </div>
    </main>
  )
}
