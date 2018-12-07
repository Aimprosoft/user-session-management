package com.aimprosoft.alfresco.webscripts;

import com.aimprosoft.alfresco.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.stream.Collectors;

/**
 * Web script for online users report by devices
 */
@Component("webscript.org.alfresco.aimprosoft.online-users-report.get")
public class OnlineUsersReportWebScript extends DeclarativeWebScript {

    private ReportService reportService;

    @Autowired
    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * @return java.util.Map with grouped by devices sessions count
     */
    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {

        return reportService.getAuthenticatedUsersCountByDevice().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue)
                );
    }
}
