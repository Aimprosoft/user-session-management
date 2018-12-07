package com.aimprosoft.alfresco.services;

import com.aimprosoft.alfresco.models.AuthenticatedUser;

/**
 * Manage users authorization
 */
public interface UserSessionsService {

    /**
     * Add authenticated user to allowed users list
     *
     * @param userName name of allowed user
     */
    void addAuthenticatedUser(String userName);

    /**
     * delete user authentication
     *
     * @param userName name of blocked user
     */
    void invalidateUserSessions(String userName);

    /**
     * get current user by ticket
     *
     * @return <code>AuthenticatedUser</code> entity
     */
    AuthenticatedUser getCurrentUser();

    /**
     * check user authentication
     *
     * @param userName checked user name
     * @return true if access allowed, else false
     */
    boolean isValidUser(String userName);

}
