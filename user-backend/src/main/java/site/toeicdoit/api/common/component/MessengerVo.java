package site.toeicdoit.api.common.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MessengerVo {
    private String message;
    private int status;
    private String accessToken;
    private String refreshToken;
    private Long boardId;
}
