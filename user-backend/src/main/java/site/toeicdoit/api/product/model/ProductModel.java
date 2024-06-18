package site.toeicdoit.api.product.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "products")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = "id")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="id", nullable = false)
    private Long id;
    @Setter
    private String name;
    @Setter
    private Long price;
    @Setter
    private String description;
    private Long userId;
    private Long subscribeDate;
    private String regDate;

}
