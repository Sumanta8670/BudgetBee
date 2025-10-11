package com.Sumanta.BudgetBee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BudgetBeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudgetBeeApplication.class, args);
	}

}
