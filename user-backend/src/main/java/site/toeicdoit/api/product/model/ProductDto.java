package site.toeicdoit.api.product.model;

import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Log4j2
public class ProductDto {
    private Long id;
    private String name;
    private Integer price;
    private String description;
    private Integer duration;
}
