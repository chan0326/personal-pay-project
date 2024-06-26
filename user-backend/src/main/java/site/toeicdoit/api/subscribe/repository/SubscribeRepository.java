package site.toeicdoit.api.subscribe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.toeicdoit.api.subscribe.model.SubscribeDto;
import site.toeicdoit.api.subscribe.model.SubscribeModel;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SubscribeRepository extends JpaRepository<SubscribeModel, Long> {

    @Query("SELECT s.id FROM subscribes s WHERE s.endDate = :endDate")
    Long findIdByendDate(@Param("endDate") LocalDateTime endDate);


    List<SubscribeModel> findAllByUserId(Long userId);
}
