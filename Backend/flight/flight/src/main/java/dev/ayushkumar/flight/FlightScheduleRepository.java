package dev.ayushkumar.flight;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightScheduleRepository extends MongoRepository<FlightSchedule, String> {
}