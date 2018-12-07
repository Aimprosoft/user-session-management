package com.aimprosoft.alfresco.controllers;

import com.aimprosoft.alfresco.services.UserSessionsService;
import org.alfresco.web.site.servlet.SlingshotLoginController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.DeviceUtils;
import org.springframework.mobile.device.LiteDevice;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Add device information to user logging
 */
public class LoginController extends SlingshotLoginController {

    private UserSessionsService userSessionsService;

    public void setUserSessionsService(UserSessionsService userSessionsService) {
        this.userSessionsService = userSessionsService;
    }

    @Override
    protected void onSuccess(HttpServletRequest request, HttpServletResponse response) throws Exception {

        LiteDevice device = (LiteDevice)DeviceUtils.getCurrentDevice(request);
        userSessionsService.registerUserAuth(request.getSession(false),
                request.getParameter("username"), device);

        super.onSuccess(request,response);
    }
}
