package servlets;


import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import models.PointData;
import models.PointDataList;

import java.io.PrintWriter;
import java.time.LocalDateTime;


@WebServlet(name = "hitCheckServlet", value = "/hitCheck")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            final long startTime = System.nanoTime();
            final String path = getServletContext().getContextPath();

            final String x_raw = request.getParameter("x");
            final String y_raw = request.getParameter("y");
            final String r_raw = request.getParameter("r");

            final double x;
            final double y;
            final double r;

            try {
                x = Double.parseDouble(x_raw);
                y = Double.parseDouble(y_raw);
                r = Double.parseDouble(r_raw);
            } catch (NumberFormatException | NullPointerException e) {
                response.sendError(400);
                return;
            }

            boolean result = checkArea(x,y,r);

            final HttpSession session = request.getSession();
            PointDataList pointDataList = (PointDataList) session.getAttribute("pointDataList");
            if (pointDataList == null) {
                pointDataList = new PointDataList();
                request.getSession().setAttribute("pointDataList", pointDataList);
            }

            final long endTime = System.nanoTime();
            final long duration = endTime - startTime;
            final LocalDateTime currentTime = LocalDateTime.now();

            PointData pointData = new PointData();
            pointData.setX(x);
            pointData.setY(y);
            pointData.setR(r);
            pointData.setResult(result);
            pointData.setExecutionTime(currentTime);
            pointData.setDuration(duration);
            pointDataList.getPointDataList().addFirst(pointData);

            response.setContentType("text/html;charset=UTF-8");
            final PrintWriter out = response.getWriter();



            

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean checkArea(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            return x <= r && y <= ((r - x) / 2);
        }
        if (x >= 0 && y <= 0) {
            return x <= (r / 2) && y >= -r;
        }
        if (x <= 0 && y >= 0) {
            return x * x + y * y <= r * r;
        }
        if (x <= 0 && y <= 0) {
            return false;
        }
        return false;
    }

}
