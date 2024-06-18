package site.toeicdoit.api.article;

import site.toeicdoit.api.article.model.ArticleDto;
import site.toeicdoit.api.article.service.ArticleServiceImpl;
import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.common.component.security.JwtProvider;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/articles")
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@Log4j2
public class ArticleController {

    private final ArticleServiceImpl service;
    private final JwtProvider jwtProvider;

    @PostMapping("/save")
    public ResponseEntity<MessengerVo> save(@RequestBody ArticleDto dto) {
        log.info("article save con: {}", dto);
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("/modify")
    public ResponseEntity<MessengerVo> modify(@RequestBody ArticleDto dto) {
        log.info("article modify con: {}", dto);
        return ResponseEntity.ok(service.modify(dto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVo> deleteById(@RequestParam("id") Long id) {
        return ResponseEntity.ok(service.deleteById(id));
    }

    @GetMapping("/detail")
    public ResponseEntity<Optional<ArticleDto>> findById(@RequestParam("id") Long id) {
        log.info("ArticleModel findById con: {}", id);
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/count")
    public ResponseEntity<MessengerVo> count() {
        return ResponseEntity.ok(service.count());
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsById(@RequestParam("id") Long id) {

        return ResponseEntity.ok(service.existsById(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ArticleDto>> getArticlesByBoardId(@RequestParam("id") Long boardId) {
        return ResponseEntity.ok(service.getArticlesByBoardId(boardId));
    }

//    @GetMapping("/findByBoardId")
//    public ResponseEntity<List<ArticleDto>> findByBoardId(@RequestParam Long id){
//        return ResponseEntity.ok(service.findByBoardId(id));
//    }

}