package dev.ayushkumar.flight;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {


    @Autowired
    private FlightRepository flightRepository;
    public List<Flight> allFlights(){
        return flightRepository.findAll();
    }

    public Optional<Flight> singleFlight(ObjectId id){
        return flightRepository.findById(id);
    }

    public Optional<Flight> singleFlightByCompany(String company){
        return flightRepository.findFlightByCompany(company);
    }
}
