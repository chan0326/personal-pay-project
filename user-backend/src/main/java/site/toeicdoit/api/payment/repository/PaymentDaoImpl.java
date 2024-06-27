package site.toeicdoit.api.payment.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.toeicdoit.api.payment.model.PaymentDto;
import site.toeicdoit.api.payment.model.QPaymentDto;
import site.toeicdoit.api.payment.model.QPaymentModel;
import site.toeicdoit.api.product.model.QProductModel;

import java.util.Collection;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PaymentDaoImpl implements PaymentDao{
    private final JPAQueryFactory queryFactory;
    private final QPaymentModel payment = QPaymentModel.paymentModel;
    private final QProductModel product = QProductModel.productModel;


    @Override
    public List<PaymentDto> getPaymentByUserId(Long userId) {
        return queryFactory.select(new QPaymentDto(
                        payment.id,
                        payment.amount,
                        payment.status,
                        payment.paymentUid,
                        payment.userId.id,
                        payment.subscribeId.id,
                        payment.productId.id,
                        payment.createdAt,
                        payment.updatedAt
                ))
                .from(payment)
                .where(payment.userId.id.eq(userId))
                .orderBy(payment.createdAt.desc())
                .fetch();
    }
}
