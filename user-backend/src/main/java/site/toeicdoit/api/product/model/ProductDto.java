package site.toeicdoit.api.product.model;

import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Log4j2
public class ProductDto {
    private Long id;
    private String name;
    private Long price;
    private String description;
    private Long userId;
    private Long subscribeDate;
    private String regDate;
}
