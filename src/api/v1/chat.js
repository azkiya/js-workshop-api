const express = require('express');
const bodyParser = require('body-parser');

const apiai = require('./../../apiai');
const task = require('./../../task');
const app = express();

app.post('/', (req, res) => {
  // jika question tidak ada
  if (!req.body.question) {
    res.json({
      status: 'fail',
      message: 'Question payload needed',
    });
  };

  apiai.askQuestion(req.body.question).then((json) => {
    let answer = '';

    switch (json.result.metadata.intentName) {
      case 'task.create': {
        const taskName = json.result.parameters.text;

        task.save(taskName)

        answer = json.result.speech;

        break;
      }
      case 'task.show': {
        const tasks = task.get();

        if (tasks.length > 0) {
          const mergedTasks = task.get()
            .map((taskName, i) => `<li>#${i+1} ${taskName}</li>`)
            .join(' ');

          answer = `${json.result.speech}<br /><ul>${mergedTasks}</ul>`;
        }
        else {
          answer = `${json.result.speech}<br /><ul><li>You have no task</li></ul>`;
        }

        break;
      }
      case 'task.delete': {
        const nth = Number(json.result.parameters.number);

        if (isNaN(nth) || nth < 1) {
          res.json({
            status: 'fail',
            message: `could not parse the number ${nth}`,
          });
        }

        task.remove(nth);

        answer = json.result.speech;

        break;
      }
      default: {
        answer = json.result.speech;
      }
    }

    return res.json({
      status: 'success',
      data: {
        answer,
      },
    });

  });
});

module.exports = app;
