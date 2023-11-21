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
import java.util.LinkedList;
import java.util.logging.Logger;


@WebServlet(name = "hitCheckServlet", value = "/hitCheck")
public class AreaCheckServlet extends HttpServlet {
    private static final Logger LOGGER = Logger.getLogger("AreaCheckServlet");

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            final long startTime = System.nanoTime();
            final String path = getServletContext().getContextPath();

            final String x_raw = request.getParameter("x");
            final String y_raw = request.getParameter("y");

            final String r_raw = request.getParameter("r");
            LOGGER.info(r_raw);
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

            boolean result = checkArea(x, y, r);
            var context = getServletContext();
            PointDataList pointDataList = new PointDataList();
            pointDataList.setPointDataList(new LinkedList<>());
            try {
                if (context.getAttribute("pointDataList") != null) {
                    pointDataList = (PointDataList) context.getAttribute("pointDataList");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            request.getServletContext().setAttribute("pointDataList", pointDataList);


            final long endTime = System.nanoTime();
            final long duration = endTime - startTime;
            final LocalDateTime currentTime = LocalDateTime.now();
            if (!val(x, y, r)){
                response.sendError(400, "incorrect values");

            }
            PointData pointData = new PointData();
            pointData.setX(x);
            pointData.setY(y);
            pointData.setR(r);
            pointData.setResult(result);
            pointData.setExecutionTime(currentTime);
            pointData.setDuration(duration);
            pointDataList.getPointDataList().addFirst(pointData);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            final PrintWriter out = response.getWriter();
            out.write(pointData.toJSonString());
            out.close();


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean checkArea(double x, double y, double r) {
        System.out.println("x: " + x + " y: " + y + " r: " + r);
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

    boolean val(double x, double y, double r){
        System.out.println(x < 3.1 && x > -5.1 && y < 5.1 && y > -5.1 && r < 3.1 && r > -3.1);
        return (x < 3.1 && x > -5.1 && y < 5.1 && y > -5.1 && r < 3.1 && r > -3.1);
    }

}
