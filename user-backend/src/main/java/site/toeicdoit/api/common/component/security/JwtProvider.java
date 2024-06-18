package site.toeicdoit.api.common.component.security;

import site.toeicdoit.api.user.model.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Log4j2
@Component
public class JwtProvider {
    @Value("${jwt.secret}")
    private String issuer;
    private Long expiration;
    private final SecretKey secretKey;

    Instant expiredDate = Instant.now().plus(1, ChronoUnit.DAYS);
    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String createToken(UserDto dto) {
        String accessToken = Jwts.builder()
                .signWith(secretKey)
                .expiration(Date.from(expiredDate))
                .subject("erichgamma")
                .claim("username", dto.getUsername())
                .claim("job", dto.getJob())
                .claim("userId", dto.getId())
                .claim("subscribe", dto.getSubscribe())
                .compact();
        log.info("createToken: " + accessToken);

//        String refreshToken = Jwts.builder()
//                .signWith(secretKey)
//                .expiration(Date.from(expiredDate.plus(1, ChronoUnit.DAYS)))
//                .subject("erichgamma")
//                .claim("username", dto.getUsername())
//                .claim("job", dto.getJob())
//                .claim("userId", dto.getId())
//                .compact();


        return accessToken;
    }

    public String extractTokenFromHeader(HttpServletRequest request) {
        log.info("프론트에서 넘어온 request.getServletPath 값 : {}", request.getServletPath());
        String bearerToken = request.getHeader("Authorization");
        log.info("bearer이 포함된 Token: {}", bearerToken);
        return bearerToken != null && bearerToken.startsWith("Bearer ") ? bearerToken.substring(7) : "undefined";
    }

    public void printPayload(String accessToken) {
        String[] chunks = accessToken.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));


        log.info("accessToken header: " + header);
        log.info("accessToken payload: " + payload);
    }

    public Claims getPayload(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }

}
