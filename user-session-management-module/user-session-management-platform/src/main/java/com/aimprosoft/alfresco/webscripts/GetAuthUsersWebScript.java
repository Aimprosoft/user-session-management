package com.aimprosoft.alfresco.webscripts;

import com.aimprosoft.alfresco.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Web script for getting information about the authenticated users
 */
@Component("webscript.org.alfresco.aimprosoft.auth-users.get")
public class GetAuthUsersWebScript extends DeclarativeWebScript {

    private ReportService reportService;

    @Autowired
    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }


    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> result = new HashMap<>();

        result.put("usersWithTicket", reportService.getAuthenticatedUsers());
        return result;
    }
}
