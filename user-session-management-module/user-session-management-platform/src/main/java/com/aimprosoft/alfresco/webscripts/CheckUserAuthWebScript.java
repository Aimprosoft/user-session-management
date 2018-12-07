package com.aimprosoft.alfresco.webscripts;

import com.aimprosoft.alfresco.services.UserSessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Web script for checking session expiring
 */
@Component("webscript.org.alfresco.aimprosoft.check-user-auth.get")
public class CheckUserAuthWebScript extends DeclarativeWebScript {

    private UserSessionsService userSessionsService;

    @Autowired
    public void setUserSessionsService(UserSessionsService userSessionsService) {
        this.userSessionsService = userSessionsService;
    }

    /**
     * @return status code `200` if user authorized and didn't expired
     */
    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {
        String userName = req.getServiceMatch().getTemplateVars().get("id");

        if (!userSessionsService.isValidUser(userName)) {
            status.setCode(Status.STATUS_UNAUTHORIZED);
        }

        return new HashMap<>();
    }
}
