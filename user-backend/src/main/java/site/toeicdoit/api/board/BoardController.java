package site.toeicdoit.api.board;

import site.toeicdoit.api.board.model.BoardDto;
import site.toeicdoit.api.board.service.BoardService;
import site.toeicdoit.api.common.component.MessengerVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@Log4j2
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService service;

    @PostMapping("/save")
    public ResponseEntity<MessengerVo> save(@RequestBody BoardDto dto){
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVo> deleteById(@RequestParam("id") Long id){
        return ResponseEntity.ok(service.deleteById(id));
    }
    @GetMapping("/list")
    public ResponseEntity<List<BoardDto>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/detail")
    public ResponseEntity<Optional<BoardDto>> findById(@RequestParam("id") Long id){
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/count")
    public ResponseEntity<MessengerVo> count(){
        return ResponseEntity.ok(service.count());
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsById(@RequestParam("id") long id){
        return ResponseEntity.ok(service.existsById(id));
    }
}
