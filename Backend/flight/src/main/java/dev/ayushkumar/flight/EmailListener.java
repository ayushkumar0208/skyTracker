package dev.ayushkumar.flight;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class EmailListener {

    private final EmailService emailService;

    public EmailListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void handleMessage(String email) {
        // Print message to console instead of sending email
        System.out.println("Notification to: " + email + " - You have a new notification!");
    }
}
