package site.toeicdoit.api.common.proxy;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.function.Supplier;

public class DateProxy {

    //get
    public static Supplier<LocalTime> getLocalTime = LocalTime::now;
    public static Supplier<LocalDate> getLocalDate = LocalDate::now;
    public static Supplier<LocalDateTime> getLocalDateTime = LocalDateTime::now;

    public static LocalDate parseDate(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        return LocalDate.parse(dateStr, formatter);
    }

}
