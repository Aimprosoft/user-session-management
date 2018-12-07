export const optionPieByDeviceType = data => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
  },
  legend: {
    x: 'right',
    y: 'center',
    data: ['Mobile', 'Desktop', 'Tablet'],
  },
  toolbox: {
    show: true,
    feature: {
      magicType: {
        show: true,
        type: ['pie', 'funnel'],
        option: {
          funnel: {
            x: '20%',
            width: '50%',
            funnelAlign: 'left',
            max: 1548,
          },
        },
      },
      restore: {
        show: true,
        title: 'Restore',
      },
      saveAsImage: {
        show: true,
        title: 'Save Image',
      },
    },
  },
  calculable: true,
  series: [
    {
      name: 'Devices',
      color: ['#73879C', '#344862', '#00b899'],
      type: 'pie',
      radius: '80%',
      center: ['33%', '50%'],
      data: data,
      label: {
        formatter: '{b} - {c}',
      },
    },
  ],
});

export const optionLineChartByDate = data => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      animation: false,
      label: {
        backgroundColor: '#505765',
      },
    },
  },
  legend: {
    x: 200,
    y: 0,
    data: ['Mobile', 'Desktop', 'Tablet'],
  },
  toolbox: {
    show: true,
    feature: {
      magicType: {
        show: true,
        title: {
          line: 'Line',
          bar: 'Bar',
          stack: 'Stack',
          tiled: 'Tiled',
        },
        type: ['line', 'bar', 'stack', 'tiled'],
      },
      restore: {
        show: true,
        title: 'Restore',
      },
      saveAsImage: {
        show: true,
        title: 'Save Image',
      },
    },
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
    },
  ],
  grid: [
    {
      left: 50,
      right: 50,
      bottom: 60,
    },
  ],
  calculable: true,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {onZero: true},
      data: data.headers,
    },
  ],
  yAxis: [{type: 'value'}, {type: 'value'}, {type: 'value'}],

  series: [
    {
      color: ['#73879C'],
      name: 'Mobile',
      type: 'line',
      smooth: true,
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default',
          },
        },
      },
      data: data.mobile,
    },
    {
      color: ['#344862'],
      name: 'Desktop',
      type: 'line',
      smooth: true,
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default',
          },
        },
      },
      data: data.desktop,
    },
    {
      color: ['#00b899'],
      name: 'Tablet',
      type: 'line',
      smooth: true,
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default',
          },
        },
      },
      data: data.tablet,
    },
  ],
});
