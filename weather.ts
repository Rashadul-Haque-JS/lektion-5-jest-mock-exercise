import axios from "axios";
const fetchWeather = async () => {
  return await axios.get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT"
  );
};

export default fetchWeather