package site.toeicdoit.api.user.model;

import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.calendar.model.CalendarModel;
import site.toeicdoit.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import site.toeicdoit.api.payment.model.PaymentModel;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Entity(name = "users")
@ToString(exclude = {"id"})
public class UserModel extends BaseEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String addressId;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String job;
    private String accessToken;
    private String email;
    @Setter
    private Long subscribe = 0L;
    @Setter
    private Long point = 0L;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<ArticleModel> articles;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<CalendarModel> calendars;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<PaymentModel> payments;


}
