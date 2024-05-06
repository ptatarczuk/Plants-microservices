package com.x250.authenticationservice.security.config.oauth.user;

import com.x250.authenticationservice.exception.OAuth2AuthenticationProcessingException;
import com.x250.authenticationservice.model.AuthProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo get(String registrationId, Map<String, Object> attributes){
        if (AuthProvider.google.name().equalsIgnoreCase(registrationId)){
            return new GoogleOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException(registrationId + " is not supported");
        }
    }
}