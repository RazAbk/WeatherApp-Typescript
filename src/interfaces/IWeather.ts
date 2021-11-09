export interface ICurrentWeatherProps {
    EpochTime: string;
    LocalObservationDateTime: string;
    WeatherText: string;
    WeatherIcon: number;
    IsDayTime: boolean;
    Temperature: {
        Metric: {
          Value: number,
          Unit: string,
          UnitType: number
        },
        Imperial: {
          Value: number,
          Unit: string,
          UnitType: number
        }
      }
}

export interface IForecastProps {
    Date: string;
    EpochDate: number;
    Temperature: {
      Minimum: {
        Value: number,
        Unit: string,
        UnitType: number;
      },
      Maximum: {
        Value: number,
        Unit: string,
        UnitType: number
      }
    },
    Day: {
      Icon: number,
      IconPhrase: string,
      HasPrecipitation: boolean
    },
    Night: {
      Icon: number,
      IconPhrase: string,
      HasPrecipitation: boolean
    },
    Sources: string[],
    MobileLink: string,
    Link: string
}