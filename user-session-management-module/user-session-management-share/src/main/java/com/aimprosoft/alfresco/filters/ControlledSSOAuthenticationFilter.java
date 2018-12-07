package com.aimprosoft.alfresco.filters;

import com.aimprosoft.alfresco.services.UserSessionsService;
import org.springframework.context.ApplicationContext;
import org.springframework.extensions.surf.RequestContextUtil;
import org.springframework.extensions.surf.UserFactory;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * filtering user authentications by calling alfresco service api
 */
@WebFilter(urlPatterns = {"/page/*", "/p/*", "/proxy/*", "/service/*"})
public class ControlledSSOAuthenticationFilter implements Filter {

    private ApplicationContext context;
    private UserSessionsService userSessionsService;

    @Override
    public void init(FilterConfig filterConfig) {
        ServletContext sc = filterConfig.getServletContext();
        this.context = WebApplicationContextUtils.getWebApplicationContext(sc);
        this.userSessionsService = this.context.getBean(UserSessionsService.class);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        //Initializing a Request context for the alfresco connector correct work
        try {
            RequestContextUtil.initRequestContext(this.context, (HttpServletRequest) request, true);
        } catch (Exception ex) {
            throw new ServletException(ex);
        }

        HttpSession currentSession = ((HttpServletRequest) request).getSession(false);

        if (currentSession != null) {
            String userName = (String) currentSession.getAttribute(UserFactory.SESSION_ATTRIBUTE_KEY_USER_ID);

            //check user authentication
            if (!userSessionsService.isValidUser(currentSession)) {
                //if user authentication is expired, invalidate sessions
                currentSession.invalidate();
                userSessionsService.invalidateUserAuth(userName);
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
