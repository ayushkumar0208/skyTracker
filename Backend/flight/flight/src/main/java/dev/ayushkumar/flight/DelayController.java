package dev.ayushkumar.flight;

import io.github.cdimascio.dotenv.Dotenv;
import org.asynchttpclient.AsyncHttpClient;
import org.asynchttpclient.DefaultAsyncHttpClient;
import org.asynchttpclient.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/delay")
public class DelayController {

    @Autowired
    private Dotenv dotenv;

    @GetMapping("/flight-delay/{originLocationCode}/{destinationLocationCode}/{departureDate}/{departureTime}/{arrivalDate}/{arrivalTime}/{aircraftCode}/{carrierCode}/{flightNumber}/{duration}")
    public ResponseEntity<String> fetchFlightSchedule(
            @PathVariable String originLocationCode,
            @PathVariable String destinationLocationCode,
            @PathVariable String departureDate,
            @PathVariable String departureTime,
            @PathVariable String arrivalDate,
            @PathVariable String arrivalTime,
            @PathVariable String aircraftCode,
            @PathVariable String carrierCode,
            @PathVariable String flightNumber,
            @PathVariable String duration) {

        AsyncHttpClient client = new DefaultAsyncHttpClient();
        ResponseEntity<String> responseEntity;
        String api_url = String.format(
                "https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=%s&destinationLocationCode=%s&departureDate=%s&departureTime=%s&arrivalDate=%s&arrivalTime=%s&aircraftCode=%s&carrierCode=%s&flightNumber=%s&duration=%s",
                originLocationCode,
                destinationLocationCode,
                departureDate,
                departureTime,
                arrivalDate,
                arrivalTime,
                aircraftCode,
                carrierCode,
                flightNumber,
                duration
        );

        try {
            String responseBody = client.prepareGet(api_url)
                    .setHeader("Authorization", dotenv.get("AUTHORIZATION_TOKEN_DELAY"))
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
