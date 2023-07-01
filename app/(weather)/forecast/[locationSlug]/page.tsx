import ForecastUI from "@/components/forecast/forecast-ui";
import prisma from "@/shared/prisma";
import { WeatherData, WeatherLocation } from "@/shared/types";
import axios from "axios";
import { Metadata } from "next";

interface ForecastPageProps {
    params: { locationSlug: string; }
}

/**
 * Query the WeatherAPI endpoint with the specified parameters to retrieve 
 * the relevant forecasting information.
 * @param postCode 
 * @returns 
 */
async function getForecast(postCode: string): Promise<Partial<WeatherData | null>> {
    try {
        const params = { q: postCode, days: 3, aqi: "no", alerts: "no" };
        const weather = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}`, { params });
        if (weather.data) return weather.data;
    } catch (error) {
        console.error("Error occurred while fetching data.", error);
    }

    return null;
}

/**
 * Upsert (insert or update) the current search term to the Postgresql 
 * database for analytical purposes.
 * @param term 
 * @param location 
 */
async function upsertRecentSearch(term: string, location: WeatherLocation) {
    if (process.env.NODE_ENV === "development") {
        return;
    }

    try {
        await prisma.recentSearch.upsert({
            where: { term },
            update: { created: new Date() },
            create: { term, name: location.name, regionName: location.region, countryName: location.country }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function generateMetadata({ params }: ForecastPageProps): Promise<Metadata> {
    const forecast = await getForecast(params.locationSlug);
    return { title: forecast?.location ? `${forecast?.location?.name} (${forecast?.location?.region}) weather` : `Unknown Location` };
}

export default async function ForecastPage({ params }: ForecastPageProps) {
    const forecast = await getForecast(params.locationSlug);
    if (forecast?.location) await upsertRecentSearch(params.locationSlug, forecast.location);

    return <div className={"w-full flex flex-col items-center justify-center"}><ForecastUI forecast={forecast} /></div>;
}
