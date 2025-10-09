"use client"
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import Container from "../components/Container";
import WeatherDeatils from "../components/WeatherDeatils";
import ForecastWeatherDetail from "../components/ForecastWeatherDetail";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        fontFamily: "Segoe UI, Arial, sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      <Navbar />
      <Container>
        <div
          style={{
            maxWidth: 500,
            margin: "2rem auto",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#1976d2",
              marginBottom: "1.5rem",
              letterSpacing: "1px",
            }}
          >
            <span role="img" aria-label="cloud">
              ⛅
            </span>{" "}
            Weather App
          </h1>
          <SearchBox />
          <div style={{ margin: "2rem 0" }}>
            <WeatherDeatils />
          </div>
          <ForecastWeatherDetail />
        </div>
      </Container>
    </main>
  );
}