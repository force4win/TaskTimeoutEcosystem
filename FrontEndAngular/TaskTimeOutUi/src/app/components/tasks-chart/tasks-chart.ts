import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Task } from '../../models/task.models';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './tasks-chart.html',
  styleUrls: ['./tasks-chart.scss'],
})
export class TasksChartComponent implements OnInit {
  tasks: Task[] = [];
  chartData: ChartData<'doughnut'>[] = [];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public doughnutChartType: 'doughnut' = 'doughnut';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.processTasksForChart();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading tasks', err);
      },
    });
  }

  processTasksForChart(): void {
    this.chartData = this.tasks.map((task) => {
      const { elapsed, remaining } = this.calculateTimeDifference(
        task.startDate,
        task.dueDate
      );

      return {
        labels: ['Remaining', 'Elapsed'],
        datasets: [
          {
            data: [remaining, elapsed],
            backgroundColor: ['#FF0000', '#E0E0E0'], // Red for remaining, Gray for elapsed
            hoverBackgroundColor: ['#FF0000', '#E0E0E0'],
            borderWidth: 0,
          },
        ],
      };
    });
  }

  calculateTimeDifference(
    startDateStr: string,
    dueDateStr: string
  ): { elapsed: number; remaining: number; total: number } {
    const start = new Date(startDateStr).getTime();
    const due = new Date(dueDateStr).getTime();
    const now = new Date().getTime();
    const total = due - start;

    if (now < start) {
      return { elapsed: 0, remaining: total, total };
    }

    if (now > due) {
      return { elapsed: total, remaining: 0, total };
    }

    const elapsed = now - start;
    const remaining = due - now;
    return { elapsed, remaining, total };
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}