package site.toeicdoit.api.calendar.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import site.toeicdoit.api.article.model.ArticleDto;
import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.calendar.model.CalendarDto;
import site.toeicdoit.api.calendar.model.CalendarModel;
import site.toeicdoit.api.calendar.repository.CalendarRepository;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.common.proxy.DateProxy;
import site.toeicdoit.api.user.model.UserModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarRepository repo;

    private boolean isDuplicate(CalendarDto dto) {
        return repo.existsByTitleAndAllDayAndStartTimeAndUserId(
                dto.getTitle(),
                dto.isAllDay(),
                dto.getStartTime(),
                UserModel.builder().id(dto.getUserId()).build()
        );
    }


    @Override
    public MessengerVo add(CalendarDto dto) {
        log.info("CalendarDto save con12: {}", dto);


        // DB에서 같은 제목, 사용자 ID를 가진 모든 일정 데이터를 가져옴
        List<CalendarModel> existingCalendars = repo.findByTitleAndUserId(dto.getTitle(), UserModel.builder().id(dto.getUserId()).build());

        log.info("existingCalendars: {}", existingCalendars);
        dto.getStartTime();
        // 모든 일정 데이터를 반복하면서 중복 여부를 확인
        // DTO의 startTime에서 월과 일을 추출
        int dtoMonth = dto.getStartTime().getMonthValue();
        int dtoDay = dto.getStartTime().getDayOfMonth();

        // 중복 체크를 위한 플래그
        boolean isDuplicate = existingCalendars.stream()
                .anyMatch(calendar -> {
                    int calendarMonth = calendar.getStartTime().getMonthValue();
                    int calendarDay = calendar.getStartTime().getDayOfMonth();
                    return calendarMonth == dtoMonth && calendarDay == dtoDay;
                });

        if (isDuplicate) {
            log.info("Duplicate calendar event found. Not saving the event.");
            return MessengerVo.builder()
                        .message("FAILURE: Already exists")
                        .build();
        }

        repo.save(dtoToEntity(dto));
        return MessengerVo.builder()
                .message("SUCCESS")
                .build();
    }

    @Transactional
    @Override
    public MessengerVo save(List<CalendarDto> calendarDto) {
        log.info("ArticleModel save Impl: {}", calendarDto);

        List<CalendarModel> savedModels = calendarDto.stream()
                .filter(dto -> !isDuplicate(dto))
                .map(this::dtoToEntity)
                .map(repo::save)
                .toList();

        // Find all existing models for the user
        Long userId = calendarDto.get(0).getUserId();
        List<CalendarModel> existingModels = repo.findByUserId(UserModel.builder().id(userId).build());

        // Find and delete models that are not in the new list
        existingModels.stream()
                .filter(existingModel -> calendarDto.stream()
                        .noneMatch(dto -> dto.getTitle().equals(existingModel.getTitle())
                                && dto.isAllDay() == existingModel.isAllDay()
                                && dto.getStartTime().equals(existingModel.getStartTime())))
                .forEach(repo::delete);

        boolean allSuccess = savedModels.size() == calendarDto.size();

        return MessengerVo.builder()
                .message(allSuccess ? "SUCCESS" : "FAIL")
                .build();
    }


    @Override
    public MessengerVo save(CalendarDto calendarDto) {
        return null;
    }

    @Override
    public MessengerVo deleteById(Long id) {
        return null;
    }

    @Override
    public MessengerVo modify(CalendarDto calendarDto) {
        return null;
    }

    @Override
    public List<CalendarDto> findAll() {
        return List.of();
    }

    @Override
    public Optional<CalendarDto> findById(Long id) {
        log.info("CalendarDto findById Impl: {}", id);
        return repo.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public MessengerVo count() {
        return null;
    }

    @Override
    public Boolean existsById(Long id) {
        return null;
    }

    @Override
    public List<CalendarDto> getCalendarByUserId(Long userId) {
        return repo.getCalendarByUserId(userId).stream().map(i -> entityToDto(i)).peek(System.out::println).toList();
    }
}
