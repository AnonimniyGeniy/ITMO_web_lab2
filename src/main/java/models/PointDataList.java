package models;


import java.beans.JavaBean;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;

@JavaBean
public class PointDataList implements Serializable {
    private LinkedList<PointData> pointDataList;

    public PointDataList(){
        super();
    }

    public LinkedList<PointData> getPointDataList() {
        return pointDataList;
    }

    public void setPointDataList(LinkedList<PointData> pointDataList) {
        this.pointDataList = pointDataList;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (!(obj instanceof PointDataList)) {
            return false;
        }
        PointDataList pointDataList = (PointDataList) obj;
        return this.pointDataList.equals(pointDataList.getPointDataList());
    }

    @Override
    public String toString() {
        return "PointDataList{" +
                "pointDataList=" + pointDataList +
                '}';
    }


    @Override
    public int hashCode() {
        return pointDataList.hashCode();
    }

}
