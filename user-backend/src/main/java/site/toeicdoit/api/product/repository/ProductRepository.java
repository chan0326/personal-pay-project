package site.toeicdoit.api.product.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import site.toeicdoit.api.product.model.ProductModel;

import java.time.LocalDateTime;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {


    @Modifying
    @Transactional
    @Query(value = "UPDATE products p SET p.subscribeDate = p.subscribeDate - 1 WHERE p.subscribeDate IS NOT NULL  " )
    void decrementSubscribeDate();


    @Modifying
    @Transactional
    @Query(value = "UPDATE products p SET p.subscribeDate = 0 WHERE p.subscribeDate < 0 " )
    void UpdateSubscribeDate();
}
