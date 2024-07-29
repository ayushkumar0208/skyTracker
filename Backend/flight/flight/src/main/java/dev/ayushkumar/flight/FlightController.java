package dev.ayushkumar.flight;

import io.github.cdimascio.dotenv.Dotenv;
import org.asynchttpclient.AsyncHttpClient;
import org.asynchttpclient.DefaultAsyncHttpClient;
import org.asynchttpclient.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private Dotenv dotenv;

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        return new ResponseEntity<>(flightService.allFlights(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Flight>> getSingleFlight(@PathVariable ObjectId id) {
        return new ResponseEntity<>(flightService.singleFlight(id), HttpStatus.OK);
    }

    @GetMapping("/flightCompany/{company}")
    public ResponseEntity<Optional<Flight>> getSingleFlightByCompany(@PathVariable String company) {
        return new ResponseEntity<>(flightService.singleFlightByCompany(company), HttpStatus.OK);
    }

    @GetMapping("/{flight}/{date}")
    private ResponseEntity<String> fetchFlightSchedule(@PathVariable String flight, @PathVariable String date) {
        AsyncHttpClient client = new DefaultAsyncHttpClient();
        ResponseEntity<String> responseEntity;
        String api_url = String.format(
                "https://test.api.amadeus.com/v2/schedule/flights?carrierCode=%s&flightNumber=%s&scheduledDepartureDate=%s",
                flight.substring(0, 2), flight.substring(2), date
        );

        try {
            String responseBody = client.prepareGet(api_url)
                    .setHeader("Authorization", dotenv.get("AUTHORIZATION_TOKEN_FLIGHT"))
                    .execute()
                    .toCompletableFuture()
                    .thenApply(Response::getResponseBody)
                    .exceptionally(e -> {
                        throw new RuntimeException(e);
                    })
                    .join();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json");
            responseEntity = ResponseEntity.ok().headers(headers).body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        } finally {
            try {
                client.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return responseEntity;
    }
}
