package site.toeicdoit.api.user.service;

import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.common.service.CommandService;
import site.toeicdoit.api.common.service.QueryService;
import site.toeicdoit.api.user.model.UserModel;
import site.toeicdoit.api.user.model.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService extends CommandService<UserDto>, QueryService<UserDto> {
    List<UserDto> findAll();
    MessengerVo modify(UserDto user);
    List<UserDto> findUsersByName(String name);
    List<UserDto> findUsersByJob(String job);
    Optional<UserModel> findUserByUsername(String username);

    default UserModel dtoToEntity(UserDto dto){
        return UserModel.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .addressId(dto.getAddressId())
                .job(dto.getJob())
                .build();
    }

    default UserDto entityToDto(UserModel userModel){
        return UserDto.builder()
                .id(userModel.getId())
                .username(userModel.getUsername())
                .password(userModel.getPassword())
                .name(userModel.getName())
                .phone(userModel.getPhone())
                .job(userModel.getJob())
                .build();
    }
    MessengerVo login(UserDto param);

    MessengerVo existsByUsername(String username);

    Boolean logout(String accessToken);


    // default UserDto entityToDto(Optional<UserModel> optional){
    //     return UserDto.builder().build();
    // }
}
