package com.bajkic.LuanMoerFashion.APIController;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Component
public class EmailController{
	
	public EmailController() {
		
	}
	
	public void sendQuestion(String sender,String message) throws IOException {
		Email from = new Email(sender);
	    String subject = "Sending with SendGrid is Fun";
	    Email to = new Email("comradejaroslav@gmail.com");
	    Content content = new Content("text/plain", message);
	    Mail mail = new Mail(from, subject, to, content);

	    SendGrid sg = new SendGrid(System.getenv("TEST_KEY"));
	    Request request = new Request();
	    {
	    try {
	      request.setMethod(Method.POST);
	      request.setEndpoint("mail/send");
	      request.setBody(mail.build());
	      Response response = sg.api(request);
	      System.out.println(response.getStatusCode());
	      System.out.println(response.getBody());
	      System.out.println(response.getHeaders());
	    } catch (IOException ex) {
	      throw ex;
	    }
	    }
	}
	
}
