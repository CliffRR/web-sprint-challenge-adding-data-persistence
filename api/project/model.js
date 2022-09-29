// build your `Project` model here
const db = require('../../data/dbConfig')

const getById = (id) => {
    return db('projects as p').where('p.project_id', id).first()
}

const getByIdTask = (id) => {
    return db('tasks as p').where('p.task_id', id).first()
}

function getResources() {
    return db('resources as r')
}

async function postResource(resource) {
    const [resource_id] = await db('resources').insert(resource);
    return getResources().where({ resource_id }).first();
}


async function getProjects() {
    const projects = await db('projects as p')

    const correctProjects = projects.map( project_stuff => {
        if(project_stuff.project_completed === 0) {
            return {...project_stuff, project_completed : false}
        }

        else if(project_stuff.project_completed === 1) {
            return {...project_stuff, project_completed : true}
        }
    })
    return correctProjects
}


async function postProject(project) {
    return db('projects as p').insert(project)
        .then(([id]) => {
            return getById(id)
        })

    // const [project_id] = await db('projects').insert(project);
    // return getProjects().where({ project_id }).first();
}

async function getTasks() {
    // const rows = await db('users as u')
    // .leftJoin('posts as p', 'u.id', 'p.user_id')
    // .select(
    //   'u.id as user_id',
    //   'username',
    //   'contents',
    //   'p.id as post_id',
    // )
    // .where('u.id', id)


    const tasks = await db('tasks as t')
    .join('projects as p', 't.project_id' ,'=', 'p.project_id')
    .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')

    const correctTasks = tasks.map( task_stuff => {
        if(task_stuff.task_completed === 0) {
            return {...task_stuff, task_completed : false}
        }

        else if(task_stuff.task_completed === 1) {
            return {...task_stuff, task_completed : true}
        }
    })
    return correctTasks
}

async function postTask(task) {
    // const [task_id] = await db('tasks').insert(task);
    // return getTasks().where({ task_id }).first();
    return db('tasks as t').insert(task)
        .then(([id]) => {
            return getByIdTask(id)
        })



}

module.exports = {
    getById,
    getByIdTask,
    getResources,
    postResource,
    getProjects,
    postProject,
    getTasks,
    postTask
}