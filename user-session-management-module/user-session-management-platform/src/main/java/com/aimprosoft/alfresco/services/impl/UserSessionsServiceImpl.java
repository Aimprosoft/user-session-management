package com.aimprosoft.alfresco.services.impl;

import com.aimprosoft.alfresco.models.AuthenticatedUser;
import com.aimprosoft.alfresco.services.UserSessionsService;
import org.alfresco.repo.security.authentication.TicketComponent;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.security.AuthenticationService;
import org.alfresco.service.cmr.security.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * manage user authentication in memory
 * store only blocked users for checking authority
 * for unblocking, user need to logging
 */
@Service
public class UserSessionsServiceImpl implements UserSessionsService {

    private Set<String> unAuthenticatedUsers = new HashSet<>();
    private AuthenticationService authenticationService;
    private TicketComponent ticketComponent;
    private PersonService personService;

    @Autowired
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Autowired
    public void setTicketComponent(TicketComponent ticketComponent) {
        this.ticketComponent = ticketComponent;
    }

    @Autowired
    public void setPersonService(PersonService personService) {
        this.personService = personService;
    }

    @Override
    public void addAuthenticatedUser(String userName) {
        unAuthenticatedUsers.remove(userName);
    }

    @Override
    public void invalidateUserSessions(String userName) {
        authenticationService.invalidateUserSession(userName);
        unAuthenticatedUsers.add(userName);
    }

    @Override
    public AuthenticatedUser getCurrentUser() {
        String userName = authenticationService.getCurrentUserName();
        AuthenticatedUser authenticatedUser = new AuthenticatedUser();
        authenticatedUser.setUserName(userName);
        NodeRef userNode = personService.getPersonOrNull(userName);
        if (Objects.nonNull(userNode)) {
            PersonService.PersonInfo userInfo = personService.getPerson(userNode);
            authenticatedUser.setFirstName(userInfo.getFirstName());
            authenticatedUser.setLastName(userInfo.getLastName());
            authenticatedUser.setIsAdmin(true);
            authenticatedUser.setTicket(ticketComponent.getCurrentTicket(userName, false));
        }
        return authenticatedUser;
    }

    @Override
    public boolean isValidUser(String userName) {
        return userName != null && !unAuthenticatedUsers.contains(userName);
    }
}
