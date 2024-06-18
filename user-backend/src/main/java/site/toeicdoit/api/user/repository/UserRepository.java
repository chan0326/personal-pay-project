package site.toeicdoit.api.user.repository;

import site.toeicdoit.api.user.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {
    Optional<UserModel> findUserByUsername(String username);
    List<UserModel> findUsersByName(String name);
    List<UserModel> findUsersByJob(String job);

    @Modifying
    @Query("update users set accessToken =:accessToken where id =:id" )
    void modifyTokenByToken(@Param("id") Long id, @Param("accessToken") String accessToken);

    @Query("select a from users a where a.username =:username" )
    UserModel existsByUsername(@Param("username") String username);

    List<UserModel> findAllByOrderByIdDesc();
}
