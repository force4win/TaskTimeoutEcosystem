package com.alv.aa.cuarllo.TaskTimeout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TaskTimeoutApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskTimeoutApplication.class, args);
	}

}
