package site.toeicdoit.api.calendar.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.toeicdoit.api.calendar.model.CalendarModel;
import site.toeicdoit.api.calendar.model.QCalendarModel;
import site.toeicdoit.api.user.model.UserModel;

import java.util.List;
@Repository
@RequiredArgsConstructor
public class CalendarDaoImpl implements CalendarDao{
    private final JPAQueryFactory queryFactory;



    @Override
    public List<CalendarModel> getCalendarByUserId(Long userId) {
        QCalendarModel calendar = QCalendarModel.calendarModel;

        return queryFactory.selectFrom(calendar)
                .where(calendar.userId.id.eq(userId))
                .fetch();
    }
}
