//env variables must start with REACT_APP_
export default {
  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV == "production",
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8000/api" // "https://r-iot-api.azurewebsites.net/api"
};
