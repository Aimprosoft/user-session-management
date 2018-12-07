package com.aimprosoft.alfresco.services.impl;

import com.aimprosoft.alfresco.models.AuthenticatedUser;
import com.aimprosoft.alfresco.services.ReportService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;


/**
 * Service for generation user activity reports
 * store authenticated users in memory
 */
@Service
public class ReportServiceImpl implements ReportService {

    private Set<AuthenticatedUser> authenticatedUsers = new HashSet<>();

    @Override
    public Map<String, Integer> getAuthenticatedUsersCountByDevice() {
        Map<String, Integer> result = new HashMap<>(4);

        authenticatedUsers.forEach((authenticatedUser) -> {
            Integer count = result.getOrDefault(authenticatedUser.getDeviceType(), 0);
            result.put(authenticatedUser.getDeviceType(), ++count);
        });

        return result;
    }

    @Override
    public Set<AuthenticatedUser> getAuthenticatedUsers() {
        return authenticatedUsers;
    }

    @Override
    public void addAuthenticatedUser(AuthenticatedUser authenticatedUser) {
        this.authenticatedUsers.add(authenticatedUser);
    }

    @Override
    public void deleteAuthenticatedUser(AuthenticatedUser authenticatedUser) {
        this.authenticatedUsers.remove(authenticatedUser);
    }
}
