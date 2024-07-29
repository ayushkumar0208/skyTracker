package dev.ayushkumar.flight;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EmailController {

    private final RabbitTemplate rabbitTemplate;

    public EmailController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("/notify")
    public void sendNotification(@RequestBody EmailRequest emailRequest) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_NAME, emailRequest.getEmail());
    }
}

class EmailRequest {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}