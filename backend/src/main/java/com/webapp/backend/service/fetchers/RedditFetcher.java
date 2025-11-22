package com.webapp.backend.service.fetchers;

import com.webapp.backend.config.ApiConfig;
import com.webapp.backend.model.NicheResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RedditFetcher {
    private final ApiConfig apiConfig;

    public List<NicheResult> fetch(String query) {

        String url = apiConfig.getReddit().getBaseUrl()
                + "/search.json?q=" + query;

        return List.of(
                new NicheResult(
                        "Sample Reddit Post",
                        url,
                        "Reddit"
                )
        );
    }
}
