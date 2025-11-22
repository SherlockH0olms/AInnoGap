package com.webapp.backend.service;

import com.webapp.backend.model.NicheResult;
import com.webapp.backend.model.entity.CachedResult;
import com.webapp.backend.model.entity.SearchHistory;
import com.webapp.backend.repository.CachedResultRepository;
import com.webapp.backend.repository.SearchHistoryRepository;
import com.webapp.backend.service.fetchers.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NicheService {
    private final ProductHuntFetcher productHuntFetcher;
    private final GitHubFetcher gitHubFetcher;
    private final RedditFetcher redditFetcher;
    private final HackerNewsFetcher hackerNewsFetcher;
    private final StackOverflowFetcher stackOverflowFetcher;
    private final SearchHistoryRepository searchHistoryRepository;
    private final CachedResultRepository cachedResultRepository;

    public List<NicheResult> fetchAll(String query) {

        // 1) save search history
        searchHistoryRepository.save(new SearchHistory(query));

        // 2) check cache
        List<CachedResult> cached = cachedResultRepository.findByQuery(query);
        if (!cached.isEmpty()) {
            return cached.stream()
                    .map(c -> new NicheResult(c.getTitle(), c.getUrl(), c.getSource()))
                    .toList();
        }

        // 3) fetch from APIs
        List<NicheResult> results = new ArrayList<>();
        results.addAll(productHuntFetcher.fetch(query));
        results.addAll(gitHubFetcher.fetch(query));
        results.addAll(redditFetcher.fetch(query));
        results.addAll(hackerNewsFetcher.fetch(query));
        results.addAll(stackOverflowFetcher.fetch(query));

        // 4) save cache
        for (NicheResult r : results) {
            cachedResultRepository.save(
                    new CachedResult(query, r.getTitle(), r.getUrl(), r.getSource())
            );
        }

        return results;
    }
}
