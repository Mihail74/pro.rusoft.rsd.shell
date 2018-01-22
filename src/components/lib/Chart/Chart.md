# Configuration
http://www.chartjs.org/docs/latest/

# Usage example
```html
<chart
  type="bar"
  :data="{
    labels: ['Foo', 'Bar', 'Baz'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1,
      data: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    }, {
      label: 'Dataset 2',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
      data: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    }]
  }"
  :options="{
    legend: {
      display: true,
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Bar Chart'
    }
  }"
/>
```
