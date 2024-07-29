package dev.ayushkumar.flight;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void handleMessage(String email) {
        // Logic to send email
        System.out.println("Sending email to: " + email);
        // Use JavaMailSender or other email sending libraries
    }
}