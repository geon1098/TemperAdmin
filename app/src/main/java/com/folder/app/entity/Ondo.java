package com.folder.app.entity;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ondos")
public class Ondo {

    @Id
    private Long id;

    @Column(name = "temperature09")
    private Float temperature09;

    @Column(name = "temperature13")
    private Float temperature13;

    @Column(name = "temperature17")
    private Float temperature17;

    @Column(name = "checker")
    private String checker;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTemperature09() {
        return this.temperature09;
    }

    public void setTemperature09(Float temperature09) {
        this.temperature09 = temperature09;
    }

    public Float getTemperature13() {
        return this.temperature13;
    }

    public void setTemperature13(Float temperature13) {
        this.temperature13 = temperature13;
    }

    public Float getTemperature17() {
        return this.temperature17;
    }

    public void setTemperature17(Float temperature17) {
        this.temperature17 = temperature17;
    }

    public String getChecker() {
        return this.checker;
    }

    public void setChecker(String checker) {
        this.checker = checker;
    }

    // 생성자 및 다른 메서드는 생략됨

    // 날짜와 시간을 기반으로 ID 설정
    public void setIdForDateAndTime() {
        LocalDateTime now = LocalDateTime.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int date = now.getDayOfMonth();
        int hour = now.getHour();

        long id = year * 1000000 + month * 10000 + date * 100 + hour;
        this.id = id;
    }
}