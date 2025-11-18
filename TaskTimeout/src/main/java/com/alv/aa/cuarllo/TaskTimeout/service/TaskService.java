package com.alv.aa.cuarllo.TaskTimeout.service;

import com.alv.aa.cuarllo.TaskTimeout.dto.TaskRawDto;
import com.alv.aa.cuarllo.TaskTimeout.dto.TaskRequestDto;
import com.alv.aa.cuarllo.TaskTimeout.dto.TaskResponseDto;
import com.alv.aa.cuarllo.TaskTimeout.model.Task;
import com.alv.aa.cuarllo.TaskTimeout.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {
        Task task = new Task();
        task.setDescription(taskRequestDto.getDescription());
        task.setStartDate(taskRequestDto.getStartDate());

        if (taskRequestDto.getDueDate() != null) {
            task.setDueDate(taskRequestDto.getDueDate());
        } else if (taskRequestDto.getDaysToDueDate() != null) {
            task.setDueDate(taskRequestDto.getStartDate().plusDays(taskRequestDto.getDaysToDueDate()));
        } else {
            throw new IllegalArgumentException("Debe proporcionar una fecha de vencimiento o el número de días para el vencimiento.");
        }

        Task savedTask = taskRepository.save(task);
        return convertToDto(savedTask);
    }

    public List<TaskResponseDto> getAllTasks() {
        return taskRepository.findAllByOrderByDueDateAsc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TaskRawDto> getAllTasksRaw() {
        return taskRepository.findAllByOrderByDueDateAsc().stream()
                .map(this::convertToRawDto)
                .collect(Collectors.toList());
    }

    public Optional<TaskResponseDto> updateTask(Long id, TaskRequestDto taskRequestDto) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setDescription(taskRequestDto.getDescription());
                    task.setStartDate(taskRequestDto.getStartDate());

                    if (taskRequestDto.getDueDate() != null) {
                        task.setDueDate(taskRequestDto.getDueDate());
                    } else if (taskRequestDto.getDaysToDueDate() != null) {
                        task.setDueDate(taskRequestDto.getStartDate().plusDays(taskRequestDto.getDaysToDueDate()));
                    } else {
                        throw new IllegalArgumentException("Debe proporcionar una fecha de vencimiento o el número de días para el vencimiento.");
                    }
                    Task updatedTask = taskRepository.save(task);
                    return convertToDto(updatedTask);
                });
    }

    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private TaskResponseDto convertToDto(Task task) {
        TaskResponseDto dto = new TaskResponseDto();
        dto.setId(task.getId());
        dto.setDescription(task.getDescription());
        dto.setStartDate(task.getStartDate());
        dto.setDueDate(task.getDueDate());

        LocalDate today = LocalDate.now();
        dto.setTotalTaskDays(ChronoUnit.DAYS.between(task.getStartDate(), task.getDueDate()));
        dto.setDaysRemainingForDueDate(ChronoUnit.DAYS.between(today, task.getDueDate()));

        return dto;
    }

    private TaskRawDto convertToRawDto(Task task) {
        TaskRawDto dto = new TaskRawDto();
        dto.setId(task.getId());
        dto.setDescription(task.getDescription());
        dto.setStartDate(task.getStartDate());
        dto.setDueDate(task.getDueDate());
        return dto;
    }
}
