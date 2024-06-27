package site.toeicdoit.api.payment.service;

import com.siot.IamportRestClient.exception.IamportResponseException;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.payment.model.PaymentDto;
import site.toeicdoit.api.payment.model.PaymentModel;
import site.toeicdoit.api.product.model.ProductModel;
import site.toeicdoit.api.subscribe.model.SubscribeModel;
import site.toeicdoit.api.user.model.UserDto;
import site.toeicdoit.api.user.model.UserModel;

import java.io.IOException;
import java.util.List;

public interface PaymentService {
    default PaymentModel dtoToEntity(PaymentDto dto){
        return PaymentModel.builder()
                .id(dto.getId())
                .status(dto.getStatus())
                .amount(dto.getAmount())
                .paymentUid(dto.getPaymentUid())
                .userId(UserModel.builder().id(dto.getUserId()).build())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .subscribeId(SubscribeModel.builder().id(dto.getSubscribeId()).build())
                .productId(ProductModel.builder().id(dto.getProductId()).build())
                .build();
    }

    default PaymentDto entityToDto(PaymentModel entity){
        return PaymentDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .amount(entity.getAmount())
                .paymentUid(entity.getPaymentUid())
                .userId(entity.getUserId().getId())
                .build();
    }

    MessengerVo save(PaymentDto dto);


    List<PaymentDto> getPaymentByUserId(Long userId);

    MessengerVo refundPayment(PaymentDto dto) throws IamportResponseException, IOException;
}
