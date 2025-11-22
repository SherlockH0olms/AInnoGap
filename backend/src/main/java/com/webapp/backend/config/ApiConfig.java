package com.webapp.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "api")
@Data
public class ApiConfig {
    private ServiceConfig producthunt;
    private ServiceConfig github;
    private ServiceConfig reddit;
    private ServiceConfig hackernews;
    private ServiceConfig stackoverflow;

    @Data
    public static class ServiceConfig {
        private String key;
        private String baseUrl;
    }
}
