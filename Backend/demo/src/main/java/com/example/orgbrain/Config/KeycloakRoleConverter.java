package com.example.orgbrain.Config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.*;
import java.util.stream.Collectors;

public class KeycloakRoleConverter
        implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final String REALM_ACCESS = "realm_access";
    private static final String RESOURCE_ACCESS = "resource_access";
    private static final String ROLES = "roles";
    private static final String CLIENT_ID = "projecterp1";

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {

        Set<String> roles = new HashSet<>();

        // 1️⃣ Realm roles
        Map<String, Object> realmAccess = jwt.getClaim(REALM_ACCESS);
        if (realmAccess != null && realmAccess.get(ROLES) instanceof Collection<?> realmRoles) {
            realmRoles.forEach(role -> roles.add(role.toString()));
        }

        // 2️⃣ Client roles
        Map<String, Object> resourceAccess = jwt.getClaim(RESOURCE_ACCESS);
        if (resourceAccess != null
                && resourceAccess.get(CLIENT_ID) instanceof Map<?, ?> clientAccess
                && clientAccess.get(ROLES) instanceof Collection<?> clientRoles) {

            clientRoles.forEach(role -> roles.add(role.toString()));
        }

        // 3️⃣ Convert to authorities
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> "ROLE_" + role.toUpperCase())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new JwtAuthenticationToken(jwt, authorities);
    }
}


