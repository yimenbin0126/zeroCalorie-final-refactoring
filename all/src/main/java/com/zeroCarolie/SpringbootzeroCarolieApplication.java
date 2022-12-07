package com.zeroCarolie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.zeroCarolie")
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class SpringbootzeroCarolieApplication {
    public static void main(String[] args){
        SpringApplication.run(SpringbootzeroCarolieApplication.class,args);
    }
}