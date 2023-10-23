package servlets;

import java.io.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;


@WebServlet(name = "controllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet{
    public void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        String path = getServletContext().getContextPath();

        if (request.getParameter("drop") != null) {
            request.getSession().invalidate();
        }

        if (request.getParameter("x") != null
                && request.getParameter("y") != null
                && request.getParameter("r") != null) {
            path += "/hitCheck?x=" + request.getParameter("x")
                    + "&y=" + request.getParameter("y")
                    + "&r=" + request.getParameter("r");
        }
        response.sendRedirect(path);
    }
}
