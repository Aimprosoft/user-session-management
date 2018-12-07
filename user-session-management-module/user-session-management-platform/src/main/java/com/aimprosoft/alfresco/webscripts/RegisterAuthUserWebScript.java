package com.aimprosoft.alfresco.webscripts;

import com.aimprosoft.alfresco.models.AuthenticatedUser;
import com.aimprosoft.alfresco.services.ReportService;
import com.aimprosoft.alfresco.services.UserSessionsService;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Web script for registering a user in alfresco system
 * without registration, users in share will be invalidate
 */
@Component("webscript.org.alfresco.aimprosoft.register-user-auth.post")
public class RegisterAuthUserWebScript extends DeclarativeWebScript {

    private static final Logger LOGGER = LoggerFactory.getLogger(RegisterAuthUserWebScript.class);

    private UserSessionsService userSessionsService;
    private ReportService reportService;

    @Autowired
    public void setUserSessionsService(UserSessionsService userSessionsService) {
        this.userSessionsService = userSessionsService;
    }

    @Autowired
    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * @return status code `200`
     */
    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {

        Map<String, Object> result = new HashMap<>();

        try {
            JSONObject json = new JSONObject(req.getContent().getContent());
            AuthenticatedUser user = userSessionsService.getCurrentUser();
            user.setDeviceType(json.getString("device"));

            userSessionsService.addAuthenticatedUser(user.getUserName());
            reportService.addAuthenticatedUser(user);
        } catch (JSONException | IOException e) {
            LOGGER.error("Cannot register user auth", e);
        }

        result.put("status", status);

        return result;
    }
}
