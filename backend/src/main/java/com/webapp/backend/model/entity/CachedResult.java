package com.webapp.backend.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CachedResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String query;
    private String title;
    private String url;
    private String source;

    private LocalDateTime cachedAt = LocalDateTime.now();

    public CachedResult(String query, String title, String url, String source) {
        this.query = query;
        this.title = title;
        this.url = url;
        this.source = source;
        this.cachedAt = LocalDateTime.now();
    }
}
