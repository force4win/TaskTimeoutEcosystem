package com.alv.aa.cuarllo.TaskTimeout.repository;

import com.alv.aa.cuarllo.TaskTimeout.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOrderByDueDateAsc();
}
