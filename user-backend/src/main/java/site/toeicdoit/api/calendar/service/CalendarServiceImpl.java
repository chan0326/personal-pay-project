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
import site.toeicdoit.api.user.model.UserModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{

    private final CalendarRepository repo;




    @Transactional
    @Override
    public MessengerVo save(List<CalendarDto> calendarDtos) {
        log.info("ArticleModel save Impl: {}", calendarDtos);

        List<CalendarModel> savedModels = calendarDtos.stream()
                .filter(dto -> !isDuplicate(dto))
                .map(this::dtoToEntity)
                .map(repo::save)
                .toList();

        // Find all existing models for the user
        Long userId = calendarDtos.get(0).getUserId();
        List<CalendarModel> existingModels = repo.findByUserId(UserModel.builder().id(userId).build());

        // Find and delete models that are not in the new list
        existingModels.stream()
                .filter(existingModel -> calendarDtos.stream()
                        .noneMatch(dto -> dto.getTitle().equals(existingModel.getTitle())
                                && dto.isAllDay() == existingModel.isAllDay()
                                && dto.getStart().equals(existingModel.getStart())))
                .forEach(repo::delete);

        boolean allSuccess = savedModels.size() == calendarDtos.size();

        return MessengerVo.builder()
                .message(allSuccess ? "SUCCESS" : "FAIL")
                .build();
    }

    private boolean isDuplicate(CalendarDto dto) {
        return repo.existsByTitleAndAllDayAndStartAndUserId(
                dto.getTitle(),
                dto.isAllDay(),
                dto.getStart(),
                UserModel.builder().id(dto.getUserId()).build()
        );
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
