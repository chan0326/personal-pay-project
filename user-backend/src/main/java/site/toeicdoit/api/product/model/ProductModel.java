package site.toeicdoit.api.product.model;

import jakarta.persistence.*;
import lombok.*;
import site.toeicdoit.api.common.model.BaseEntity;
import site.toeicdoit.api.payment.model.PaymentModel;
import site.toeicdoit.api.subscribe.model.SubscribeModel;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "products")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = "id")
public class ProductModel extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="id", nullable = false)
    private Long id;
    @Setter
    private String name;
    @Setter
    private Integer price;
    @Setter
    private String description;
    @Setter
    private Integer duration;

    @OneToMany(mappedBy = "productId", fetch = FetchType.LAZY)
    private List<PaymentModel> paymentIds;


}
