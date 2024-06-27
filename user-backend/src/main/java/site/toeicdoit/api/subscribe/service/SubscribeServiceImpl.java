package site.toeicdoit.api.subscribe.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.subscribe.model.SubscribeDto;
import site.toeicdoit.api.subscribe.model.SubscribeModel;
import site.toeicdoit.api.subscribe.repository.SubscribeRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService{
    private final SubscribeRepository subscribeRepository;
    @Transactional
    @Override
    public MessengerVo save(SubscribeDto dto) {
        if (dto.getSubscribeState() == null) {
            dto.setSubscribeState(false);
        }



        if (dto.getEndDate().isAfter(dto.getCreatedAt())) {
            dto.setSubscribeState(true);
            subscribeRepository.save(dtoToEntity(dto));
        } else {
            dto.setSubscribeState(false);

            return MessengerVo.builder()
                    .message("FAILURE")
                    .build();
        }

        Long id = subscribeRepository.findIdByendDate(dto.getEndDate());


        return MessengerVo.builder()
                .message("SUCCESS")
                .subscribeId(id)
                .build();
    }

    @Transactional
    public MessengerVo check(Long userId) {
        List<SubscribeModel> subscriptions = subscribeRepository.findAllByUserId(userId);
        boolean hasTrueSubscribe = false;

        // 각 구독 정보에 대해 조건을 적용합니다.
        for (SubscribeModel subscription : subscriptions) {
            // endDate가 현재 시간 이후이면 true로 설정하고 저장
            if (subscription.getEndDate().isAfter(LocalDateTime.now())) {
                subscription.setSubscribeState(true);
                hasTrueSubscribe = true;
            } else {
                subscription.setSubscribeState(false);
            }
            subscribeRepository.save(subscription); // 구독 정보를 업데이트
        }

        // 하나라도 true인 경우 "SUCCESS" 메시지를 반환
        if (hasTrueSubscribe) {
            return MessengerVo.builder()
                    .message("SUCCESS")
                    .build();
        } else {
            return MessengerVo.builder()
                    .message("FAILURE")
                    .build();
        }
    }
}
