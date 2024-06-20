package site.toeicdoit.api.payment.repository;

import site.toeicdoit.api.payment.model.PaymentDto;

import java.util.Collection;
import java.util.List;

public interface PaymentDao {
    List<PaymentDto> getPaymentByUserId(Long userId);
}
