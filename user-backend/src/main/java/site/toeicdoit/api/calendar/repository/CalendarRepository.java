package site.toeicdoit.api.calendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.toeicdoit.api.calendar.model.CalendarModel;
import site.toeicdoit.api.user.model.UserModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarModel, Long> {


    @Query("select c from calendars c where c.userId.id = :userId")
    List<CalendarModel> getCalendarByUserId(@Param("userId") Long userId);

    boolean existsByTitleAndAllDayAndStartAndUserId(String title, boolean allDay, String start, UserModel userId);

    List<CalendarModel> findByUserId(UserModel userId);
}