package site.toeicdoit.api.user.service;


import site.toeicdoit.api.common.component.security.JwtProvider;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.user.model.UserModel;
import site.toeicdoit.api.user.model.UserDto;
import site.toeicdoit.api.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final JwtProvider jwt;

    @Override
    public MessengerVo save(UserDto dto) {
        var ent = repository.save(dtoToEntity(dto));
        System.out.println(" ============ UserServiceImpl save instanceof =========== ");
        System.out.println((ent instanceof UserModel) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof UserModel) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public MessengerVo deleteById(Long id) {
        repository.deleteById(id);
        return MessengerVo.builder()
                .message(repository.findById(id).isPresent() ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public List<UserDto> findAll() {
        return repository.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public MessengerVo count() {
        return MessengerVo.builder()
                .message(repository.count() + "")
                .build();
    }

    @Override
    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public MessengerVo modify(UserDto dto) {
        var ent = repository.save(dtoToEntity(dto));
        log.info(" ============ BoardServiceImpl modify Entity =========== ");
        log.info(ent);
        System.out.println((ent instanceof UserModel) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof UserModel) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public List<UserDto> findUsersByName(String name) {
        return repository.findUsersByName(name).stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public List<UserDto> findUsersByJob(String job) {
        return repository.findUsersByJob(job).stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<UserModel> findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    // SRP에 따라 아이디 존재여부를 프론트에서 먼저 판단하고 넘어옴(시큐리티 SOLID 5대 원칙)
    // findUserByUsername(dto.getUsername()).get().getPassword().equals(dto.getPassword())?"S":"F"
    @Transactional
    @Override
    public MessengerVo login(UserDto dto) {
        log.info("login Impl: " + dto);
        var user = repository.findUserByUsername(dto.getUsername()).get();
        var accessToken = jwt.createToken(entityToDto(user));
        var flag = user.getPassword().equals(dto.getPassword());

        // 토큰을 각 섹션(Header, Payload, Signature)으로 분할
        jwt.printPayload(accessToken);
        repository.modifyTokenByToken(user.getId(), accessToken);
        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? accessToken : "None")
                .build();
    }

    @Override
    public MessengerVo existsByUsername(String username) {
        log.info("existsByUsername Impl: " + username);
        boolean flag = false;
        if (repository.existsByUsername(username) == null) {
            flag = false;
        } else {
            flag = true;
        }
        log.info("existsByUsername flag: " + flag);
        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Transactional
    @Override
    public Boolean logout(String accessToken) {
        log.info("logout Impl accessToken: " + accessToken);
        String noBearerToken = accessToken.substring(7);
        log.info("logout Impl noBearerToken: " + noBearerToken);
        Long id = jwt.getPayload(noBearerToken).get("userId", Long.class);
        log.info("logout Impl id: " + id);
        repository.modifyTokenByToken(id, null);
        return repository.findById(id).get().getAccessToken() == null ? true : false;
    }
}

// 비밀번호 암호화(salt) 보안(security) 이슈로 보류
//    public String getEncrypt(String pwd, String salt) {
//
//        String result = "";
//        try {
//            //1. SHA256 알고리즘 객체 생성
//            MessageDigest md = MessageDigest.getInstance("SHA-256");
//
//            //2. 비밀번호와 salt 합친 문자열에 SHA 256 적용
//            System.out.println("비밀번호 + salt 적용 전 : " + pwd+salt);
//            md.update((pwd+salt).getBytes());
//            byte[] pwdsalt = md.digest();
//
//            //3. byte To String (10진수의 문자열로 변경)
//            StringBuffer sb = new StringBuffer();
//            for (byte b : pwdsalt) {
//                sb.append(String.format("%02x", b));
//            }
//
//            result=sb.toString();
//            System.out.println("비밀번호 + salt 적용 후 : " + result);
//
//        } catch (NoSuchAlgorithmException e) {
//            e.printStackTrace();
//        }
//
//        return result;
//    }
