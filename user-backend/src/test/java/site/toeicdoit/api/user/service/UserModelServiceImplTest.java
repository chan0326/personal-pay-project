package site.toeicdoit.api.user.service;

import site.toeicdoit.api.user.model.UserModel;
import site.toeicdoit.api.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import org.mockito.BDDMockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class UserModelServiceImplTest {

    private UserService service;
    @Mock
    private UserRepository repository;

    @BeforeEach
    void setup() {
//        this.service = new UserModelServiceImplTest();
    }
    @Test
    public void 사용자_저장()throws Exception {

        Optional<UserModel> user = Optional.of(UserModel.builder().id(1L).name("홍길동").build());
        //when(repository.save(user)).thenReturn(user);
        // assertThat(service.count().getMessage()).isEqualTo("0");
        // assertThat(service.findById(1L).get().getName()).isEqualTo("홍길동");
        // verify(repository, times(1)).findById(1L);
        // verify(repository, never()).findAll();
        // verifyNoInteractions(repository);
    }
    @Test
    public void 사용자_검색()throws Exception {

        Optional<UserModel> user = Optional.of(UserModel.builder().id(1L).name("홍길동").build());
        when(repository.findById(anyLong())).thenReturn(user);
        Assertions.assertThat(service.findById(1L).get().getName()).isEqualTo("홍길동");
        // verify(repository, times(1)).findById(1L);
        // verify(repository, never()).findAll();
        // verifyNoInteractions(repository);
    }
    @Test
    public void 사용자_전체_검색()throws Exception {

        var users = getList();
        BDDMockito.given(repository.findAll()).willReturn(users);
        var list = service.findAll();
        assertThat(list.size())
                .isEqualTo(3);

        // verify(repository, times(1)).findById(1L);
        // verify(repository, never()).findAll();
        // verifyNoInteractions(repository);
    }

    private List<UserModel> getList() {
        return Arrays.asList(
                UserModel.builder().id(1L).username("yoo").name("유관순").build(),
                UserModel.builder().id(2L).username("kim").name("김구").build(),
                UserModel.builder().id(3L).username("lee").name("이화림").build()
        );
    }

}