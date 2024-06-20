package site.toeicdoit.api.payment.model;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import site.toeicdoit.api.common.enums.PaymentStatus;

@Component
@NoArgsConstructor
@Data
@Builder
@Log4j2
public class PaymentDto {
    private Long id; // 결제 번호
    private Long amount; // 결제 금액
    private PaymentStatus status; // 결제 상태
    private String paymentUid; // 결제 고유 번호
    private Long userId;
    private String paymentDate;

    @QueryProjection
    public PaymentDto(Long id, Long amount, PaymentStatus status, String paymentUid, Long userId, String paymentDate) {
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.paymentUid = paymentUid;
        this.userId = userId;
        this.paymentDate = paymentDate;
    }
}



