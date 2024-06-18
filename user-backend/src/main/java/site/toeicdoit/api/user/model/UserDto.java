package site.toeicdoit.api.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDto {
    private Long id;
    private String addressId;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String job;
    private String regDate;
    private String modDate;
    private String token;
    private Long point;
    private Long subscribe;
    private String email;
}
