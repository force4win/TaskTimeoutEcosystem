package com.alv.aa.cuarllo.TaskTimeout.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequestDto {

    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;

    @NotNull(message = "La fecha de inicio no puede estar vacía")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Future(message = "La fecha de vencimiento debe ser en el futuro")
    private LocalDate dueDate;

    private Integer daysToDueDate;
}
