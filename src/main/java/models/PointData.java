package models;

import java.beans.JavaBean;
import java.io.Serializable;
import java.time.LocalDateTime;

@JavaBean
public class PointData implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean result;
    private LocalDateTime executionTime;
    private long duration;

    public PointData(){
        super();
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }
    public void setY(double y) {
        this.y = y;
    }

    public boolean getResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    @Override
    public String toString() {
        return "PointData{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (!(obj instanceof PointData)) {
            return false;
        }
        PointData pointData = (PointData) obj;
        return pointData.x == x &&
                pointData.y == y &&
                pointData.r == r &&
                pointData.result == result;
    }

    @Override
    public int hashCode() {
        int result = 19;
        result = 31 * result + (int)x;
        result = 31 * result + (int)y;
        result = 31 * result + (int)r;
        result = 31 * result + (this.result ? 1 : 0);
        return result;
    }

    public LocalDateTime getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(LocalDateTime executionTime) {
        this.executionTime = executionTime;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }
}
