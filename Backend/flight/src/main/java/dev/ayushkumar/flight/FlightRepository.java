package dev.ayushkumar.flight;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FlightRepository extends MongoRepository<Flight, ObjectId> {

    Optional<Flight> findFlightByCompany(String company);
}
