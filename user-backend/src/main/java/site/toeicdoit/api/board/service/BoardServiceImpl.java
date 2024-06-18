package site.toeicdoit.api.board.service;

import site.toeicdoit.api.board.model.BoardModel;
import site.toeicdoit.api.board.model.BoardDto;
import site.toeicdoit.api.board.repository.BoardRepository;
import site.toeicdoit.api.common.component.MessengerVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    
    private final BoardRepository repo;

    @Override
    public MessengerVo save(BoardDto dto) {
        BoardModel ent = repo.save(dtoToEntity(dto));
        System.out.println(" ============ BoardServiceImpl save instanceof =========== ");
        System.out.println((ent instanceof BoardModel) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof BoardModel) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public MessengerVo deleteById(Long id) {
        repo.deleteById(id);
        return new MessengerVo();
    }

    @Override
    public MessengerVo modify(BoardDto dto) {
        BoardModel ent = repo.save(dtoToEntity(dto));
        System.out.println(" ============ BoardServiceImpl modify instanceof =========== ");
        System.out.println((ent instanceof BoardModel) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof BoardModel) ? "SUCCESS" : "FAILURE")
                .build();
    }


    @Override
    public List<BoardDto> findAll() {
        return repo.findAll().stream().map(i-> entityToDto(i)).toList();
    }

    @Override
    public Optional<BoardDto> findById(Long id) {
        return repo.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public MessengerVo count() {
        return MessengerVo.builder()
                .message(repo.count()+"")
                .build();
    }

    @Override
    public Boolean existsById(Long id) {
        return repo.existsById(id);
    }
}
