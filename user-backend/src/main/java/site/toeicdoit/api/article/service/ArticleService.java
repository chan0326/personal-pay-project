package site.toeicdoit.api.article.service;

import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.article.model.ArticleDto;
import site.toeicdoit.api.board.model.BoardModel;
import site.toeicdoit.api.common.service.CommandService;
import site.toeicdoit.api.common.service.QueryService;
import site.toeicdoit.api.user.model.UserModel;

import java.util.List;

public interface ArticleService extends CommandService<ArticleDto>, QueryService<ArticleDto> {

    default ArticleModel dtoToEntity(ArticleDto dto) {
        return ArticleModel.builder()
                .boardId(BoardModel.builder().id(dto.getBoardId()).build())
                .userId(UserModel.builder().id(dto.getUserId()).build())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
    }

    default ArticleDto entityToDto(ArticleModel entity){
        return ArticleDto.builder()
                .id(entity.getId())
                .boardId(entity.getBoardId().getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .writerUsername(entity.getUserId().getUsername())
                .registerDate(entity.getRegDate().toString())
                .modDate(entity.getModDate().toString())
                .build();
    }

    List<ArticleDto> getArticlesByBoardId(Long boardId);

}
