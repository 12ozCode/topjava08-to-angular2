package ru.javawebinar.topjava.web.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    protected static final Logger logger = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);

    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException,
            ServletException {
//        We don't need tomcat html exception so we override behavior
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");

//        New behavior

        PrintWriter writer = response.getWriter();
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
    }
}
