package site.toeicdoit.api.subscribe.model;

import jakarta.persistence.*;
import lombok.*;
import site.toeicdoit.api.common.enums.PaymentStatus;
import site.toeicdoit.api.common.model.BaseEntity;
import site.toeicdoit.api.payment.model.PaymentModel;
import site.toeicdoit.api.product.model.ProductModel;
import site.toeicdoit.api.user.model.UserModel;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "subscribes")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = "id")
public class SubscribeModel extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id", nullable = false)
    private Long id;
    @Setter
    private Boolean subscribeState;
    @Setter
    private LocalDateTime endDate;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserModel userId;

    @OneToMany(mappedBy = "subscribeId", fetch = FetchType.LAZY)
    private List<PaymentModel> paymentIds;

}
