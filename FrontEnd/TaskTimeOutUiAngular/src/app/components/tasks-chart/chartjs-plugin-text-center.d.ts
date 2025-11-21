import { ChartType } from 'chart.js';

declare module 'chart.js' {
  // Extiende las opciones de los plugins para todos los tipos de gráficos
  // para incluir las opciones de nuestro plugin personalizado 'textCenter'.
  interface PluginOptionsByType<TType extends ChartType> {
    textCenter?: {
      displayMode: 'percentage' | 'days';
    };
  }
}
