package site.toeicdoit.api.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
public class SchedulerConfig {

//    @Scheduled(fixedRate=1000) // 단위: ms
//    public void fixedRateScheduler() {
//        System.out.println("나는 작업이 끝날때 까지 기다리지 않고 1000ms 마다 실핼될거야");
//    }

//    @Scheduled(cron="0/60 * * * * ?")
//    public void cronScheduler() {
//        System.out.println("나는 시스템 시간을 기준으로 1분 마다 주기적으로 실행될거야");
//    }

//    @Schedueld(fixedDelay=1000) // 단위: ms
//    public void fixedDelayScheduler() {
//        System.out.println("나는 이 작업이 끝나고 나서 다시 1000ms 후에 실행될거야");
//    }
}
