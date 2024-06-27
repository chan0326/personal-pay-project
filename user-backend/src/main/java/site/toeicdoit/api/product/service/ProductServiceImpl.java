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
    @Override
    public MessengerVo payment(ProductDto dto) {
        productRepository.save(dtoToEntity(dto));
        return MessengerVo.builder()
                .message("상품결제 성공")
                .build();
    }
}
