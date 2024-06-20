package site.toeicdoit.api.calendar.repository;

import site.toeicdoit.api.calendar.model.CalendarModel;
import site.toeicdoit.api.user.model.UserModel;

import java.util.List;

public interface CalendarDao {
    List<CalendarModel> getCalendarByUserId(Long userId);
}
