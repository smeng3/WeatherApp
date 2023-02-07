import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const WeatherApp = ({ apiKey }) => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async (lat, lon, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      const { main, weather, wind, name } = response.data;
      const temperature = Math.round(main.temp - 273.15);
      const conditions = weather[0].description;
      const windSpeed = Math.round(wind.speed * 3.6);
      const data = {
        temperature,
        conditions,
        windSpeed,
        city: name,
      };
      return data;
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const weather = await getWeatherData(44.34, 10.99, apiKey);
    if (weather) {
      setWeather(weather);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="mb-5">Weather App</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Get Weather
            </Button>
          </Form>
          {weather && (
            <div className="mt-5">
              <h2>{weather.city}</h2>
              <p>
                {weather.conditions}, {weather.temperature}°C
              </p>
              <p>Wind Speed: {weather.windSpeed} km/h</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherApp;
