package site.toeicdoit.api.product.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.payment.repository.PaymentRepository;
import site.toeicdoit.api.product.model.ProductDto;
import site.toeicdoit.api.product.model.ProductModel;
import site.toeicdoit.api.product.repository.ProductRepository;
import site.toeicdoit.api.user.model.UserModel;
import site.toeicdoit.api.user.repository.UserRepository;

import java.time.LocalDateTime;

import static java.time.LocalTime.now;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    @Override
    public MessengerVo payment(ProductDto dto) {
        Long userId = dto.getUserId();
        Long price = dto.getPrice();
        Long subscribe = dto.getSubscribeDate();
        String regDate = now().toString();
        dto.setRegDate(regDate);
        log.info(subscribe.toString());

        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getPoint() < price) {
            return MessengerVo.builder()
                    .message("포인트가 부족합니다.")
                    .build();
        }

        user.setPoint(user.getPoint() - price);
        dto.setPrice(user.getPoint());
        user.setSubscribe(user.getSubscribe() == null ? 0L : user.getSubscribe() + subscribe);
        productRepository.save(dtoToEntity(dto));
        userRepository.save(user);
        return MessengerVo.builder()
                .message("상품결제 성공")
                .build();
    }
    @Transactional
    @Async
    @Scheduled(cron = "0 0 19  * * *")
    public void updateSubscribeDates() {

        productRepository.UpdateSubscribeDate();
        productRepository.decrementSubscribeDate();

    }


}
