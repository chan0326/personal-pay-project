package site.toeicdoit.api.user.model;

import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.calendar.model.CalendarModel;
import site.toeicdoit.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import site.toeicdoit.api.payment.model.PaymentModel;
import site.toeicdoit.api.subscribe.model.SubscribeModel;

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
    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<ArticleModel> articles;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<CalendarModel> calendarIds;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<PaymentModel> paymentIds;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<SubscribeModel> subscribeIds;


}
