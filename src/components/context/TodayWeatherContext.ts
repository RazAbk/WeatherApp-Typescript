import { createContext } from "react";
import { ICityProps } from "../../interfaces/ICity";
import { ICurrentWeatherProps } from "../../interfaces/IWeather";

export const TodayWeatherContext = createContext<any>(null);

export interface IWeatherContext {
    todayWeather: ICurrentWeatherProps
    setTodayWeather: React.Dispatch<React.SetStateAction<ICurrentWeatherProps | null>>
    currentCity: ICityProps | null;
}