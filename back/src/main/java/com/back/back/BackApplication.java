package com.back.back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}
	@Override
    public void run(String... args) throws Exception {
        System.out.println("애플리케이션이 성공적으로 기동되었습니다!");
    }

}
