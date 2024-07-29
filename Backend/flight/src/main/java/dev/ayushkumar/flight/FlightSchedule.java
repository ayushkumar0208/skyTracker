package dev.ayushkumar.flight;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flight_schedules")
public class FlightSchedule {

    @Id
    private String id;
    private String originLocationCode;
    private String destinationLocationCode;
    private String departureDate;
    private String departureTime;
    private String arrivalDate;
    private String arrivalTime;
    private String aircraftCode;
    private String carrierCode;
    private String flightNumber;
    private String duration;


    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getAircraftCode() {
        return aircraftCode;
    }

    public void setAircraftCode(String aircraftCode) {
        this.aircraftCode = aircraftCode;
    }



    public String getCarrierCode() {
        return carrierCode;
    }

    public void setCarrierCode(String carrierCode) {
        this.carrierCode = carrierCode;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }




    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }


    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }


    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }


    public String getOriginLocationCode () {
        return originLocationCode ;
    }
    public void setOriginLocationCode(String originLocationCode) {
        this.originLocationCode = originLocationCode;
    }


    public String getDestinationLocationCode() {
        return destinationLocationCode;
    }
    public void setDestinationLocationCode(String destinationLocationCode ) {
        this.destinationLocationCode  = destinationLocationCode ;
    }


    public String getDepartureDate() {
        return departureDate;
    }
    public void setDepartureDate(String departureDate ) {
        this.departureDate  = departureDate ;
    }
}
