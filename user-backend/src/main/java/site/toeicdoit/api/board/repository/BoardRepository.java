package site.toeicdoit.api.board.repository;

import site.toeicdoit.api.board.model.BoardModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardModel, Long> {

}
