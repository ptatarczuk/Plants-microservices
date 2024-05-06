package com.x250.apigateway.config;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
@RequiredArgsConstructor
public class AuthFilter implements WebFilter {

    private final RouteValidator routeValidator;
    private final JwtService jwtService;
//    private final ReactiveUserDetailsService reactiveUserDetailsService;
    private final UserDetailsService userDetailsService;

    @Override
    public Mono<Void> filter(@NonNull ServerWebExchange exchange, @NonNull WebFilterChain chain) {

        try {
            if (!routeValidator.isSecured.test(exchange.getRequest())) {
                return chain.filter(exchange);
            }

            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return chain.filter(exchange);
            }

            String jwt = resolveToken(exchange.getRequest());
            if (jwt == null) {
                return chain.filter(exchange);
            }

            if (StringUtils.hasText(jwt) && jwtService.isTokenValid(jwt)) {
                return Mono.fromCallable(() -> getAuthentication(jwt))
                        .subscribeOn(Schedulers.boundedElastic())
                        .flatMap(authentication -> chain.filter(exchange)
                                .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication)));

            }
            return chain.filter(exchange);
        } catch (Exception exception) {
            return chain.filter(exchange).onErrorResume(Exception.class, ex -> Mono.fromRunnable(() ->
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED)
            ));
        }
    }

    private Authentication getAuthentication(String token) {
        String userEmail = jwtService.extractUsername(token);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
        return new UsernamePasswordAuthenticationToken(// we creat object of type UsernamePassword this object is needed by Spring and by SecurityContextHolder in order to update our SecurityContext
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }

    private String resolveToken(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
