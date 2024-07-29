import React, { useState } from "react";
import Ticket from "./Ticket";

const Home = () => {
  const [flightNo, setFlightNo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFlightNoChange = (e) => {
    setFlightNo(e.target.value);
  };

  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const fetchFlightData = async () => {
    const formattedDate = formatDate(departureDate);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/flights/${flightNo}/${formattedDate}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch flight data");
    }
  };

  const fetchAdditionalData = async (flightData) => {
    try {
      const originLocationCode = flightData.data[0].flightPoints[0].iataCode;
      const destinationLocationCode = flightData.data[0].flightPoints[1].iataCode;
      const departureDate = flightData.data[0].scheduledDepartureDate;
      const departureTime =
        flightData.data[0].flightPoints[0].departure.timings[0].value.substring(11, 16) + ":00";
      const arrivalDate =
        flightData.data[0].flightPoints[1].arrival.timings[0].value.substring(0, 10);
      const arrivalTime =
        flightData.data[0].flightPoints[1].arrival.timings[0].value.substring(11, 16) + ":00";
      const aircraftCode = flightData.data[0].legs[0].aircraftEquipment.aircraftType;
      const carrierCode = flightData.data[0].flightDesignator.carrierCode;
      const flightNumber = flightData.data[0].flightDesignator.flightNumber;
      const duration = flightData.data[0].legs[0].scheduledLegDuration;

      const url = `http://localhost:8080/api/v1/delay/flight-delay/${originLocationCode}/${destinationLocationCode}/${departureDate}/${departureTime}/${arrivalDate}/${arrivalTime}/${aircraftCode}/${carrierCode}/${flightNumber}/${duration}`;
      console.log(url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const additionalData = await response.json();
      return additionalData;
    } catch (error) {
      throw new Error("Failed to fetch additional data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const flightData = await fetchFlightData();
      const additionalData = await fetchAdditionalData(flightData);
      setFlightData(flightData);
      setAdditionalData(additionalData);
      setError("");
    } catch (error) {
      setError(error.message);
      setFlightData(null);
      setAdditionalData(null);
    } finally {
      setLoading(false);
    }
  };

  const getDelayInfo = () => {
    const arr = additionalData.data;
    if (!arr || arr.length === 0) {
      return null; // Return null if arr is empty or not defined
    }

    let maxProbabilityObj = arr[0]; // Initialize with the first object

    for (let i = 1; i < arr.length; i++) {
      if (parseFloat(arr[i].probability) > parseFloat(maxProbabilityObj.probability)) {
        maxProbabilityObj = arr[i];
      }
    }

    return maxProbabilityObj;
  };

  const delayInfo = additionalData ? getDelayInfo() : null;

  return (
    <div>
      <div className="text-4xl font-mono p-5 " id="track">
        <form onSubmit={handleSubmit} className="flex w-full justify-evenly p-5">
          <div>
            <label htmlFor="flightNo">Flight No:</label>
            <input
              className="text-3xl text-blue-600 bg-slate-200 p-2 rounded-lg w-90"
              type="text"
              id="flightNo"
              placeholder="Enter Flight Number"
              value={flightNo}
              onChange={handleFlightNoChange}
              required
            />
          </div>
          <div>
            <label htmlFor="departureDate">Departure Date:</label>
            <input
              className="text-3xl text-blue-600 bg-slate-200 p-2 rounded-lg"
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={handleDepartureDateChange}
              required
            />
          </div>
          <button type="submit" className="text-2xl p-3 bg-blue-500 rounded-lg text-white">
            Search
          </button>
        </form>
        {loading && <div>Loading...</div>} {/* Conditionally render the loading indicator */}
        {error && <p>{error}</p>}
        {flightData && additionalData && (
          <Ticket
            carrierCode={flightData.data[0].flightDesignator.carrierCode}
            flightNumber={flightData.data[0].flightDesignator.flightNumber}
            from={flightData.data[0].flightPoints[0].iataCode}
            to={flightData.data[0].flightPoints[1].iataCode}
            departureDate={flightData.data[0].scheduledDepartureDate}
            departureTime={flightData.data[0].flightPoints[0].departure.timings[0].value}
            arrivalTime={flightData.data[0].flightPoints[1].arrival.timings[0].value}
            delay={delayInfo}
          />
        )}
        {/* {additionalData && (
          <div>
            <h3>Additional Data:</h3>
            <pre>{JSON.stringify(additionalData, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
