package site.toeicdoit.api.user;

import site.toeicdoit.api.common.component.MessengerVo;
import site.toeicdoit.api.user.model.UserDto;
import site.toeicdoit.api.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
@Log4j2
public class AuthController {
    private final UserServiceImpl service;


    @PostMapping("/save")
    public ResponseEntity<MessengerVo> save(@RequestBody UserDto dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<MessengerVo> login(@RequestBody UserDto dto) {
        log.info("login con: " + dto);
        return ResponseEntity.ok(service.login(dto));
    }

    @GetMapping("/exists-username")
    public ResponseEntity<MessengerVo> existsByUsername(@RequestParam("username") String username) {
        log.info("existsByUsername con: " + username);
        return ResponseEntity.ok(service.existsByUsername(username));
    }

}

