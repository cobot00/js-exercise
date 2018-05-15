const addMinutes = (time, minutes) => {
  const result = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate(),
    time.getHours(),
    time.getMinutes()
  );
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

class C3Generator {
  generateScore(startAt) {
    const scores = [];
    for (let i = 1; i <= 60; i++) {
      scores.push(Math.floor(Math.random() * 100) + 1);
    }

    return scores.map((s, index) => {
      return {time: addMinutes(startAt, 10 * index), score: s};
    });
  }

  drawChart(element, startAt) {
    const score = this.generateScore(startAt);
    return c3.generate({
      bindto: element,
      data: {
        json: score,
        keys: {
          x: 'time',
          value: ['score']
        }
      },
      axis: {
        x: {
          label: {
            text: '時刻',
            position: 'outer-right',
          },
          type: 'timeseries',
          tick: {
            format: '%H:%M',
            culling: {
              max: 11 // to 1 hour interval
            }
          }
        },
        y: {
          max: 100,
          min: 0,
          label: {
            text: 'スコア',
            position: 'outer-right'
          },
          padding: {
            top: 0,
            bottom: 0
          }
        }
      },
      legend: {
        show: false
      },
      size: {
        width: 800,
        height: 200
      },
      point: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    });
  }
}

window.onload = () => {
  const n = Math.floor(Math.random() * 8) + 3;

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= n; i++) {
    const div = document.createElement('div');
    div.id = `chart${i}`;
    fragment.appendChild(div);
  }
  const parent = document.querySelector('#chart-parent');
  parent.appendChild(fragment);

  const startAt = addMinutes(new Date(), -600);
  startAt.setMinutes(0);

  const generator = new C3Generator();
  for (let i = 1; i <= n; i++) {
    generator.drawChart(`#chart${i}`, startAt);
  }
};
