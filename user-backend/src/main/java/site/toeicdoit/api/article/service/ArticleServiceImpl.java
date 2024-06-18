package site.toeicdoit.api.article.service;

import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.article.repository.ArticleRepository;
import site.toeicdoit.api.article.model.ArticleDto;
import site.toeicdoit.api.common.component.MessengerVo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Log4j2
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository repo;

    @Transactional
    @Override
    public MessengerVo save(ArticleDto dto) {
        log.info("ArticleModel save Impl: {}", dto);
        ArticleModel result = repo.save(dtoToEntity(dto));
        System.out.println((result instanceof ArticleModel) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((result instanceof ArticleModel) ? "SUCCESS" : "FAILURE")
                .boardId(dto.getBoardId())
                .build();
    }

    @Override
    public MessengerVo deleteById(Long id) {
        return MessengerVo.builder()
                .message(
                        Stream.of(id)
                                .filter(i -> existsById(i))
                                .peek(i -> repo.deleteById(i))
                                .map(i -> "SUCCESS")
                                .findAny()
                                .orElseGet(() -> "FAILURE"))
                .build();
    }

    @Transactional
    @Override
    public MessengerVo modify(ArticleDto dto) {
        log.info("ArticleModel modify Impl: {}", dto);
        ArticleModel ent = dtoToEntity(dto);
        Long id = dto.getId();
        String title = dto.getTitle();
        String content = dto.getContent();
        repo.updateArticleById(id, title, content);

        System.out.println((ent instanceof ArticleModel) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof ArticleModel) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public List<ArticleDto> findAll() {
        return repo.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDto> findById(Long id) {
        log.info("ArticleModel findById Impl: {}", id);
        return repo.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public MessengerVo count() {
        return MessengerVo.builder()
                .message(repo.count() + "")
                .build();
    }

    @Override
    public Boolean existsById(Long id) {
        return repo.existsById(id);
    }

    public List<ArticleDto> getArticlesByBoardId(Long boardId) {
        return repo.getArticlesByBoardId(boardId).stream().map(i -> entityToDto(i)).toList();
    }
}
