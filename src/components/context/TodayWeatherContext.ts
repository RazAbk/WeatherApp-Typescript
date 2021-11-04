import { createContext } from "react";
import { ICurrentWeatherProps } from "../../pages/WeatherApp";

export const TodayWeatherContext = createContext<any>(null);

export interface IWeatherContext {
    todayWeather: ICurrentWeatherProps
    setTodayWeather: React.Dispatch<React.SetStateAction<ICurrentWeatherProps | null>>
}