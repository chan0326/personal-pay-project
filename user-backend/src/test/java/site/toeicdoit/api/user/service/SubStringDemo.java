package site.toeicdoit.api.user.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@Log4j2
@ExtendWith(MockitoExtension.class)
public class SubStringDemo {


    @Test
    public void 문자열_분할() throws Exception {
        String str = "a,b,c";
        String data = new StringBuilder(str).append(",d,e,f").toString();
        log.info(data);
        String[] arr = data.split(",");
        Arrays.stream(arr).peek(i -> log.info(i)).toList();
        assertThat(arr.length).isEqualTo(6);
    }

    @Test
    public void 주민번호로_성별_구분() throws Exception {
        String human1 = "970301-1";
        String human2 = "950101-2";
        String human3 = "020101-3";
        String human4 = "020101-4";
        String human5 = "980101-5";
        String human6 = "820101-6";
        String human7 = "120101-7";
        String human8 = "050101-8";
        String[] arr = {human1, human2, human3, human4, human5, human6, human7, human8};
        // a, b, c, d, e, f
        // 주민번호를 통해서 나이와 성별(gender)를 출력하시오. 단, 나이는 만나이로 표기하시오.
        assertThat(getGender(human1)).isEqualTo("M");
        log.info(getGender(human1));
    }


    private String getGender(String ssn) {
        return switch (ssn.charAt(7)) {
            case '1', '3', '5' -> "M";
            case '2', '4' -> "F";
            default -> "Error";
        };
    }

    @Test
    public void now() {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        assertThat(now.getYear()).isEqualTo(2024);
        int month = now.getMonthValue();
        assertThat(month).isEqualTo(4);
        int day = now.getDayOfMonth();
        assertThat(day).isEqualTo(24);
        log.info(now);
    }

    @Test
    public void birthYear() {
        String human1 = "970301-1";
        String human2 = "950101-2";
        String human3 = "020101-3";
        String human4 = "020101-4";
        String human5 = "980101-5";
        String human6 = "820101-6";
        String human7 = "120101-7";
        String human8 = "050101-8";
        String[] arr = {human1, human2, human3, human4, human5, human6, human7, human8};
        int[] arr2 = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            arr2[i] = switch (arr[i].charAt(7)) {
                case '1', '2', '5', '6' -> Integer.parseInt(arr[i].substring(0, 2)) + 1900;
                case '3', '4', '7', '8' -> Integer.parseInt(arr[i].substring(0, 2)) + 2000;
                default -> 00;
            };
        }
        log.info(Arrays.stream(arr2).peek(i -> log.info(i)).toArray());

    }

    @Test
    public void getOldAge() {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        assertThat(now.getYear()).isEqualTo(2024);
        int month = now.getMonthValue();
        assertThat(month).isEqualTo(4);
        int day = now.getDayOfMonth();
        assertThat(day).isEqualTo(24);

        String human1 = "970101-1";
        String human2 = "950201-2";
        String human3 = "020301-3";
        String human4 = "020401-4";
        String human5 = "980424-5";
        String human6 = "820601-6";
        String human7 = "121101-7";
        String human8 = "050424-8";
        String[] arr = {human1, human2, human3, human4, human5, human6, human7, human8};
        int[] arr2 = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            arr2[i] = switch (arr[i].charAt(7)) {
                case '1', '2', '5', '6' -> Integer.parseInt(arr[i].substring(0, 2)) + 1900;
                case '3', '4', '7', '8' -> Integer.parseInt(arr[i].substring(0, 2)) + 2000;
                default -> 1800;
            };
            System.out.println("년도" + arr2[i]);
            System.out.println("월" + Integer.parseInt(arr[i].substring(2, 4)));
            System.out.println("일" + Integer.parseInt(arr[i].substring(4, 6)));
            int age = year - arr2[i];
            System.out.println("년도 뺀 나이: " + age);
            if (month < Integer.parseInt(arr[i].substring(2, 4))) {
                System.out.println("월 지나지 않음 / 나이에서 -2");
                age = age - 2;
            } else if (month == Integer.parseInt(arr[i].substring(2, 4))) {
                if (day < Integer.parseInt(arr[i].substring(4, 6))) {
                    System.out.println("월 같고, 일 지나지 않음 / 나이에서 -2");
                    age = age - 2;
                } else if (day == Integer.parseInt(arr[i].substring(4, 6))) {
                    System.out.println("월 같고, 일 같아서 (생일날) / 나이에서 -1");
                    age = age - 1;
                } else {
                    System.out.println("월 같고, 일 지나서 / 나이에서 -1");
                    age = age - 1;
                }
            } else {
                System.out.println("월 지났고, 일도 지남 / 나이에서 -1");
                age = age - 1;
            }
            System.out.printf("현재 나이는 %d 살 입니다.", age);
            System.out.println();
        }
    }

    @Test
    public void getAgeUsingLambda() {
        String human1 = "970101-1";
        int fullYear = Integer.parseInt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        int s = Stream.of(human1)
                .map(i -> Integer.parseInt(i.substring(0, 2)))
                .map(i -> switch (human1.charAt(7)) {
                    case '1', '2', '5', '6' -> i + 1900;
                    case '3', '4', '7', '8' -> i + 2000;
                    default -> i + 1800;
                })
                .map(i -> i * 10000) // 19970000
                .map(i -> i + Integer.parseInt(human1.substring(2, 6))) // 19970101
                .map(i -> (fullYear - i) / 10000) // 20240424-19970101
                .findFirst()
                .get();
        log.info(s);
    }
}
