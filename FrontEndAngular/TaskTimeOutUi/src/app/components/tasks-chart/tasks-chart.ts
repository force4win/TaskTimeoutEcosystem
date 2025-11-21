import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
export class TasksChartComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  chartData: ChartData<'doughnut'>[] = [];
  public doughnutCutout: string = '60%';
  public displayMode: 'percentage' | 'days' = 'days'; // Nueva configuración
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'];
  public doughnutChartType: 'doughnut' = 'doughnut';

  public textCenterPlugin = {
    id: 'textCenter',
    afterDraw(chart: any) {
      if (chart.config.type === 'doughnut') {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        const options = chart.options.plugins.textCenter || {};
        const displayMode = options.displayMode || 'percentage';

        const data = chart.data.datasets[0].data;
        if (data && data.length > 1) {
          const elapsed = data[0];
          const remaining = data[1];
          const total = elapsed + remaining;

          if (total === 0) return;

          let text: string;
          if (displayMode === 'days') {
            const remainingDays = (remaining / (1000 * 60 * 60 * 24)).toFixed(0);
            text = `${remainingDays}d`;
          } else {
            const percentage = ((remaining / total) * 100).toFixed(0);
            text = `${percentage}%`;
          }

          ctx.save();
          const fontHeight = 30;
          ctx.font = `bold ${fontHeight}px Arial`;
          ctx.fillStyle = '#FF0000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, centerX, centerY);
          ctx.restore();
        }
      }
    },
  };

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.doughnutChartOptions = {
      responsive: true,
      cutout: this.doughnutCutout,
      plugins: {
        legend: {
          display: false,
        },
        textCenter: {
          displayMode: this.displayMode,
        },
      },
    };
  }

  ngOnInit(): void {
    Chart.register(this.textCenterPlugin);
    this.loadTasks();
  }

  ngOnDestroy(): void {
    Chart.unregister(this.textCenterPlugin);
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
        labels: ['Elapsed', 'Remaining'],
        datasets: [
          {
            data: [elapsed, remaining],
            backgroundColor: ['#E0E0E0', '#FF0000'],
            hoverBackgroundColor: ['#E0E0E0', '#FF0000'],
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