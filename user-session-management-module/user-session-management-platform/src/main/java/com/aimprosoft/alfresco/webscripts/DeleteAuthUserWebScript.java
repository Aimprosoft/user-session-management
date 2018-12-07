package com.aimprosoft.alfresco.webscripts;

import com.aimprosoft.alfresco.models.AuthenticatedUser;
import com.aimprosoft.alfresco.services.ReportService;
import com.aimprosoft.alfresco.services.UserSessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Web script for invalidating user sessions
 */
@Component("webscript.org.alfresco.aimprosoft.auth-user.delete")
public class DeleteAuthUserWebScript extends DeclarativeWebScript {

    private UserSessionsService userSessionsService;
    private ReportService reportService;

    @Autowired
    public void setUserSessionsService(UserSessionsService userSessionsService) {
        this.userSessionsService = userSessionsService;
    }

    @Autowired
    public void setReportService(ReportService reportService){
        this.reportService = reportService;
    }

    /**
     * @return status 200
     */
    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {

        Map<String, Object> result = new HashMap<>();
        String userName = req.getServiceMatch().getTemplateVars().get("id");

        if (Objects.nonNull(userName)) {
            AuthenticatedUser authenticatedUser = new AuthenticatedUser();
            authenticatedUser.setUserName(userName);
            userSessionsService.invalidateUserSessions(userName);
            reportService.deleteAuthenticatedUser(authenticatedUser);
        } else status.setCode(Status.STATUS_BAD_REQUEST, "user name not set");

        result.put("status", status);
        return result;
    }
}
