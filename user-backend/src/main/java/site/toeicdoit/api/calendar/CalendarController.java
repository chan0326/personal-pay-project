package site.toeicdoit.api.calendar;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.toeicdoit.api.article.model.ArticleDto;
import site.toeicdoit.api.calendar.model.CalendarDto;
import site.toeicdoit.api.calendar.service.CalendarService;
import site.toeicdoit.api.calendar.service.CalendarServiceImpl;
import site.toeicdoit.api.common.component.MessengerVo;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@Log4j2
@RequestMapping("/api/calendars")
public class CalendarController {
    private final CalendarServiceImpl calendarService;

    @PostMapping("/save")
    public ResponseEntity<MessengerVo> save(@RequestBody List<CalendarDto> event) {
        log.info("CalendarDto save con: {}", event);
        return ResponseEntity.ok(calendarService.save(event));
    }


    @GetMapping("/list")
    public ResponseEntity<List<CalendarDto>> getCalendarByUserId(@RequestParam("id") Long userId) {
        log.info("ArticleModel findById con: {}", userId);
        return ResponseEntity.ok(calendarService.getCalendarByUserId(userId));
    }
}
