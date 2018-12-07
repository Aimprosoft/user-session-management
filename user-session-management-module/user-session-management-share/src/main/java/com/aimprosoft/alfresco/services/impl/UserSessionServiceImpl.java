package com.aimprosoft.alfresco.services.impl;

import com.aimprosoft.alfresco.services.UserSessionsService;
import com.sun.javafx.binding.StringFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.extensions.surf.UserFactory;
import org.springframework.extensions.surf.exception.ConnectorServiceException;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.connector.Connector;
import org.springframework.extensions.webscripts.connector.ConnectorContext;
import org.springframework.extensions.webscripts.connector.ConnectorService;
import org.springframework.extensions.webscripts.connector.HttpMethod;
import org.springframework.extensions.webscripts.json.JSONWriter;
import org.springframework.mobile.device.LiteDevice;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.text.MessageFormat;
import java.util.*;

/**
 * manage authentication by call alfresco repository
 */
@Service("userSessionsService")
public class UserSessionServiceImpl implements UserSessionsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserSessionServiceImpl.class);

    private static final String ENDPOINT = "alfresco";
    private static final String REGISTER_AUTH_URL = "/aim/users/register/";
    private ConnectorService connectorService;

    private static Map<String, Set<HttpSession>> users = new HashMap<>();

    private static final String CHECK_AUTH_URL = "/aim/users/{userName}/check";

    @Autowired
    public void setConnectorService(ConnectorService connectorService) {
        this.connectorService = connectorService;
    }

    @Override
    public void registerUserAuth(HttpSession session, String userName, LiteDevice device) {
        try {
            Connector connector = this.getConnector(session,userName);

            ConnectorContext connectorContext = new ConnectorContext(HttpMethod.POST);
            connectorContext.setContentType("application/json");

            String body = MessageFormat.format("'{'\"device\": \"{0}\"'}'",
                    JSONWriter.encodeJSONString(device.getDeviceType().toString()));

            connector.call(REGISTER_AUTH_URL, connectorContext, new ByteArrayInputStream(body.getBytes(StandardCharsets.UTF_8)));

        } catch (ConnectorServiceException e) {
            LOGGER.error("Cannot register user auth: ", e);
        }
    }

    @Override
    public boolean isValidUser(HttpSession session) {

        String userName = (String) session.getAttribute(UserFactory.SESSION_ATTRIBUTE_KEY_USER_ID);
        boolean result=true;
        try {

            Connector connector = this.getConnector(session, userName);
            result = connector.call(CHECK_AUTH_URL.replace("{userName}", userName)).getStatus().getCode() == Status.STATUS_OK;
            if(result){
                Set<HttpSession> sessions = users.getOrDefault(userName, new HashSet<>());

                sessions.add(session);
                users.put(userName, sessions);
            }
        } catch (ConnectorServiceException e) {
            LOGGER.error("Cannot validate user auth: ", e);
        }
        return result;
    }

    @Override
    public void invalidateUserAuth(String userName) {

        Set<HttpSession> sessions = users.get(userName);
        if(Objects.nonNull(sessions)) {
            sessions.forEach((userSession) -> {
                try {
                    userSession.invalidate();
                } catch (IllegalStateException ignored) {
                }
            });
        }
        users.remove(userName);
    }

    private Connector getConnector(HttpSession session, String userName) throws ConnectorServiceException {

        return this.connectorService.getConnector(ENDPOINT, userName, session);
    }
}
