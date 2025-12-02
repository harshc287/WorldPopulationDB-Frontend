import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7001", // backend URL
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;

export const getTotPopulation = () => axiosInstance.get("/dashboard/totalPopulation");
export const getTopTenPopulationCountry = () => axiosInstance.get("/dashboard/topTenPopulationCountry");
export const getUniqueContinents = () => axiosInstance.get("/dashboard/uniqueContinents");
export const getCountriesByContinent = (continent) => axiosInstance.get("/dashboard/countriesByContinent", { params: { continent } });
export const getAllCountries = () => axiosInstance.get("/dashboard/allCountriesWithContinents");
export const getPopulationByContinent = () => axiosInstance.get("/dashboard/populationByContinent");
export const getTopCountries = (limit = 10) => axiosInstance.get("/dashboard/topCountries", { params: { limit } });
