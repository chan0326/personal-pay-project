package site.toeicdoit.api.article.repository;

import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.article.model.ArticleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleModel, Long> {

String article = "new model.article.site.toeicdoit.api.article.model.ArticleDto("+
        "a.id, a.title, a.content, a.userId.id, a.boardId.id, a.regDate, a.modDate)";

//JPQL Default
    @Query("select a from articles a where a.boardId.id = :boardId ORDER BY a.id desc")
    List<ArticleModel> getArticlesByBoardId(@Param("boardId") Long boardId);

    @Modifying
    @Query("update articles set title = :title, content= :content where id = :id")
    void updateArticleById(@Param("id") Long id, @Param("title") String title, @Param("content") String content);

//Native
//    @Query("select * from articleModels a where a.boardModel.id = 1", nativeQuery = true)
//    List<Map<String, Object>>getQnaByArticles(); //Review 카테코리 값 1


//JPQL Return Type DTO
//    @Query("select "+article+" from articles a where a.boardId.id = :boardId")
//    List<ArticleDto> getArticlesDTOByBoardId(@Param("boardId") Long boardId);

    List<ArticleModel> findAllByOrderByIdDesc();
}
