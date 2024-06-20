package site.toeicdoit.api.payment.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.payment.model.PaymentModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentModel, Long> , PaymentDao{


//    @Query("select p from payments p where p.userId.id = :userId ORDER BY p.id desc")
//    List<PaymentModel> getPaymentByUserId(@Param("userId") Long userId);
}
