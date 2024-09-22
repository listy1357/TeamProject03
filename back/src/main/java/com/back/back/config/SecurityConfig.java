package com.back.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        // http
        // .authorizeHttpRequests(authorize -> authorize
        //         .requestMatchers("/api/members/join").permitAll() // 회원가입 엔드포인트는 인증 불필요
        //         .anyRequest().authenticated() // 그 외의 요청은 인증 필요
        //     );
        // http
        //     .cors().and()  // CORS 설정 적용
        //     .csrf().disable() // CSRF 비활성화
        //     .authorizeHttpRequests(authorize -> authorize
        //         .requestMatchers("/api/members/join").permitAll() // 회원가입 엔드포인트는 인증 불필요
        //         .anyRequest().authenticated() // 그 외의 요청은 인증 필요
        //     )
        //     .formLogin().disable(); // 기본 로그인 폼 비활성화

        return http.build();
    }
}
