package site.toeicdoit.api.common.component.interceptor;

import site.toeicdoit.api.common.component.security.JwtProvider;
import site.toeicdoit.api.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.stream.Stream;


@Component
@RequiredArgsConstructor
@Log4j2
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwt;
    private final UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return Stream.of(request)
                .map(i -> jwt.extractTokenFromHeader(i))
                .filter(token -> !token.equals("undefined"))
                .peek(token -> log.info("1- 인터셉터 토큰 로그: {}", token))
                .map(token -> jwt.getPayload(token).get("userId", Long.class))
                .filter(id -> userRepository.existsById(id))
                .peek(id -> log.info("2- 인터셉터 사용자ID: {}", id))
                .findFirst()
                .isPresent()
                ;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
