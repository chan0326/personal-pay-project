package site.toeicdoit.api.calendar.model;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import site.toeicdoit.api.user.model.UserModel;

import java.time.LocalDateTime;

@Component
@NoArgsConstructor
@Data
@Builder
public class CalendarDto {
    private Long id;
    private String title;
    private boolean allDay;
    private String start;
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;


    @QueryProjection
    public CalendarDto(Long id, String title, boolean allDay, String start, Long userId, LocalDateTime startTime, LocalDateTime endTime) {

        this.id = id;
        this.title = title;
        this.allDay = allDay;
        this.start = start;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;

    }
}
