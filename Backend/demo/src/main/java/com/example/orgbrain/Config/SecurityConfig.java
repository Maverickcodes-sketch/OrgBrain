package com.example.orgbrain.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                .cors(Customizer.withDefaults())


                .csrf(csrf -> csrf.disable())


                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )


                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())


                .authorizeHttpRequests(auth -> auth
                        // 🔑 Allow CORS preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public endpoint
                        .requestMatchers("/public/**").permitAll()

                        // Secured endpoints
                        .requestMatchers("/manager/**").hasRole("MANAGER")
                        .requestMatchers("/employee/**").hasRole("EMPLOYEE")

                        .anyRequest().authenticated()
                )


                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(new KeycloakRoleConverter())
                        )
                );

        return http.build();
    }
}
