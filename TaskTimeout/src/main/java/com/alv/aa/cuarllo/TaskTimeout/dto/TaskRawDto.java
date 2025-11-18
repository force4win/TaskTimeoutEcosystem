package com.alv.aa.cuarllo.TaskTimeout.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRawDto {
    private Long id;
    private String description;
    private LocalDate startDate;
    private LocalDate dueDate;
}
