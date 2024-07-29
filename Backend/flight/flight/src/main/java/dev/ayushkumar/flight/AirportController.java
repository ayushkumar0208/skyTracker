// src/main/java/dev/ayushkumar/flight/AirportController.java
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
@RequestMapping("/api/v1/airport")
public class AirportController {

    @Autowired
    private Dotenv dotenv;

    @GetMapping("/data/{iata}")
    private ResponseEntity<String> fetchDataFromApi(@PathVariable String iata) {
        AsyncHttpClient client = new DefaultAsyncHttpClient();
        ResponseEntity<String> responseEntity;
        String api_url = "https://airport-info.p.rapidapi.com/airport?iata=" + iata;
        try {
            String responseBody = client.prepareGet(api_url)
                    .setHeader("x-rapidapi-key", dotenv.get("RAPIDAPI_KEY"))
                    .setHeader("x-rapidapi-host", "airport-info.p.rapidapi.com")
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

    @GetMapping("/status/{iata}/{date}")
    private ResponseEntity<String> airportStatus(@PathVariable String iata, @PathVariable String date) {
        AsyncHttpClient client = new DefaultAsyncHttpClient();
        ResponseEntity<String> responseEntity;
        String api_url = "https://test.api.amadeus.com/v1/airport/predictions/on-time?airportCode=" + iata + "&date=" + date;
        try {
            String responseBody = client.prepareGet(api_url)
                    .setHeader("Authorization", dotenv.get("AUTHORIZATION_TOKEN_AIRPORT"))
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
