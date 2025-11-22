package com.webapp.backend.repository;

import com.webapp.backend.model.entity.CachedResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CachedResultRepository extends JpaRepository<CachedResult,Long> {
    List<CachedResult> findByQuery(String query);
}
