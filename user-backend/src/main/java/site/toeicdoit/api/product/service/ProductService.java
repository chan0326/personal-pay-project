package site.toeicdoit.api.product.service;

import site.toeicdoit.api.board.model.BoardDto;
import site.toeicdoit.api.board.model.BoardModel;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.product.model.ProductDto;
import site.toeicdoit.api.product.model.ProductModel;

public interface ProductService {
    default ProductModel dtoToEntity(ProductDto dto) {
        return ProductModel.builder()
                .id(dto.getId())
                .regDate(dto.getRegDate())
                .name(dto.getName())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .userId(dto.getUserId())
                .subscribeDate(dto.getSubscribeDate())
                .build();
    }

    MessengerVo payment(ProductDto dto);
}
