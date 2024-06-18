package site.toeicdoit.api.calendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CalendarDto {
    private Long id;
    private String title;
    private boolean allDay;
    private String start;
    private Long userId;
}
