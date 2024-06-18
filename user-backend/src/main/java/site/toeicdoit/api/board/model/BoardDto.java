package site.toeicdoit.api.board.model;

import site.toeicdoit.api.article.model.ArticleModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BoardDto {
    private Long id;
    private String title;
    private String description;
    private String regDate;
    private String modDate;
    private List<ArticleModel> articles;
}
