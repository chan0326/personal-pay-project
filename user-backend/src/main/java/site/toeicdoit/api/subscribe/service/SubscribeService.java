package site.toeicdoit.api.subscribe.service;

import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.payment.model.PaymentModel;
import site.toeicdoit.api.product.model.ProductModel;
import site.toeicdoit.api.subscribe.model.SubscribeDto;
import site.toeicdoit.api.subscribe.model.SubscribeModel;
import site.toeicdoit.api.user.model.UserModel;

public interface SubscribeService {

    default SubscribeModel dtoToEntity(SubscribeDto dto) {
        return SubscribeModel.builder()
                .id(dto.getId())
                .userId(UserModel.builder().id(dto.getUserId()).build())
                .createdAt(dto.getCreatedAt())
                .endDate(dto.getEndDate())
                .subscribeState(dto.getSubscribeState())
                .build();

    }


    MessengerVo save(SubscribeDto dto);
}
