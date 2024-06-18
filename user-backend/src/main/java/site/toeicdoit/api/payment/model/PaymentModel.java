package site.toeicdoit.api.payment.model;

import site.toeicdoit.api.common.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import site.toeicdoit.api.user.model.UserModel;


@Entity(name = "payments")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = "id")
public class PaymentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="id", nullable = false)
    private Long id; // 결제 번호
    @Setter
    private Long amount; // 결제 금액
    @Setter
    private PaymentStatus status; // 결제 상태
    @Setter
    private String paymentUid; // 결제 고유 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserModel userId;

    private String paymentDate;
}