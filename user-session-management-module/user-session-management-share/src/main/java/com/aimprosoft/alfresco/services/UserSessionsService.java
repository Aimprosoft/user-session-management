package com.aimprosoft.alfresco.services;

import org.springframework.mobile.device.LiteDevice;

import javax.servlet.http.HttpSession;

/**
 * manage users authentication
 */
public interface UserSessionsService {

    /**
     * register user authentication
     *
     * @param session  current user session
     * @param userName user name
     * @param device   current user device
     */
    void registerUserAuth(HttpSession session, String userName, LiteDevice device);

    /**
     * check user authentication
     *
     * @param session current session
     * @return true if user is valid
     */
    boolean isValidUser(HttpSession session);

    /**
     * invalidate user authentication
     *
     * @param userName user name
     */
    void invalidateUserAuth(String userName);
}
