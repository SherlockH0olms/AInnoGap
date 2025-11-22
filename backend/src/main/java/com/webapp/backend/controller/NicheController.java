package com.webapp.backend.controller;

import com.webapp.backend.model.NicheResult;
import com.webapp.backend.service.NicheService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class NicheController {
    private final NicheService nicheService;

    @GetMapping("/search")
    public ResponseEntity<List<NicheResult>> search(@RequestParam String query) {
        return ResponseEntity.ok(nicheService.fetchAll(query));
    }
}
