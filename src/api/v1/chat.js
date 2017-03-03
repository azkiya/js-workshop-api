const express = require('express');
const bodyParser = require('body-parser');

const apiai = require('./../../apiai');
const task = require('./../../task');
const app = express();

app.post('/', (req, res) => {
  // jika question tidak ada
  if (!req.body.question) {
    res.json({
      status: 'error',
      message: 'Question payload needed',
    });
  };

  apiai.askQuestion(req.body.question).then((json) => {
    let answer = '';

    console.log(task.get());
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
          .map((taskName) => `<li>${taskName}</li>`)
          .join(' ');

          answer = `${json.result.speech}<br /><ul>${mergedTasks}</ul>`;
        }
        else {
          answer = `${json.result.speech}<br /><ul><li>You have no task</li></ul>`;
        }
        

        break;
      }
      default: {
        answer = json.result.speech;
      }
    }

    return res.json({
      answer,
    });

  });
});


module.exports = app;