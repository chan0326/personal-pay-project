package site.toeicdoit.api.common.security.service;

import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.user.model.UserDto;

public interface AuthService {
    MessengerVo login(UserDto param);

}
