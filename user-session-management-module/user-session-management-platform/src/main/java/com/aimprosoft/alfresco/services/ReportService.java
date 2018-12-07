package com.aimprosoft.alfresco.services;

import com.aimprosoft.alfresco.models.AuthenticatedUser;

import java.util.Map;
import java.util.Set;

/**
 * generate users activity reports
 */
public interface ReportService {

    /**
     * generate <code>Map</code> of active users count grouped by device type
     *
     * @return <code>Map</code> of active users count
     */
    Map<String, Integer> getAuthenticatedUsersCountByDevice();

    /**
     * get authenticated users
     *
     * @return <code>Set</code>
     */
    Set<AuthenticatedUser> getAuthenticatedUsers();

    /**
     * set authenticated users
     *
     * @param authenticatedUser Authenticated user
     */
    void addAuthenticatedUser(AuthenticatedUser authenticatedUser);

    /**
     * delete authenticated users
     * @param authenticatedUser Authenticated user
     */
    void deleteAuthenticatedUser(AuthenticatedUser authenticatedUser);
}
