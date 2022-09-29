const router = require('express').Router()

const projectModel = require('./model')


router.get('/resources', (req, res, next) => {
    projectModel.getResources()
      .then(resource => {
            res.status(201).json(resource)
      })
      .catch(next);
  });

router.post('/resources', (req, res, next) => {
    projectModel.postResource(req.body)
      .then(resource => {
            res.status(201).json(resource)
      })
      .catch(next);
  });


router.get('/projects', (req, res, next) => {
    projectModel.getProjects()
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next);
});
//==---------------------------------------------------
router.post('/projects', (req, res, next) => {
    projectModel.postProject(req.body)
      .then(project => {
        // res.status(201).json({ 
        //     project_id : project.project_id,
        //     project_name : project.project_name,
        //     project_description : project.project_description,
        //     project_completed : project.project_completed
        // })



        if (project.project_completed === 0) {
            res.status(201).json({ 
                project_id : project.project_id,
                project_name : project.project_name,
                project_description : project.project_description,
                project_completed : false
            })
        }

        if (project.project_completed === 1) {
            res.status(201).json({ 
                project_id : project.project_id,
                project_name : project.project_name,
                project_description : project.project_description,
                project_completed : true
            })
        }
      })
      .catch(next);
  });

// router.post('/projects', (req, res, next) => {
//     projectModel.postProject(req.body)
//       .then(project => {
//         res.status(201).json(project)
//       })
//       .catch(next);
// });
  //=-------------------------------

router.get('/tasks', (req, res, next) => {
    projectModel.getTasks()
        .then(task => {
            // if (task.task_completed === 0) {
            //     res.status(201).json({ 
            //         task_id : task.task_id,
            //         task_description : task.task_description,
            //         task_completed : false,
            //         task_notes: task.task_notes,
            //         project_name: task.project_name,
            //         project_description: task.project_description
            //     })
            // }

            // if (task.task_completed === 1) {
            //     res.status(201).json({ 
            //         task_id : task.task_id,
            //         task_description : task.task_description,
            //         task_completed : true,
            //         task_notes: task.task_notes,
            //         project_name: task.project_name,
            //         project_description: task.project_description
            //     })
            // }
            res.status(200).json(task)
        })
        .catch(next)
})

router.post('/tasks', (req, res, next) => {
    projectModel.postTask(req.body)
      .then(tasks => {
        if (tasks.task_completed === 0) {
            res.status(201).json({ 
                task_id : tasks.task_id,
                task_description : tasks.task_description,
                task_completed : false,
                task_notes : tasks.task_notes,
                project_id: tasks.project_id,
            })
        }

        if (tasks.task_completed === 1) {
            res.status(201).json({ 
                task_id : tasks.task_id,
                task_description : tasks.task_description,
                task_completed : true,
                task_notes : tasks.task_notes,
                project_id: tasks.project_id
            })
        }
      })
      .catch(next);
  });


router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
