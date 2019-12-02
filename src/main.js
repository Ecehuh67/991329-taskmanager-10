import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {generateFilters} from './mocks/filter.js';
import {generateTasks} from './mocks/task.js';
import {createSortTemplate} from './components/sort.js';
import {createBoardContainerTemplate} from './components/board.js';



// import {createTaskTemplate} from './components/task.js';
// import {createTaskEditTemplate} from './components/task-edit.js';
// import {createLoadButtonTemplate} from './components/load-button.js';
// import {createListOfTasksTemplate} from './components/task-list.js';

const TASK_COUNT = 20; // amount of card which needs rendering

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, createMenuTemplate(), `beforeend`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(mainElement, createFilterTemplate(filters), `beforeend`);

render(mainElement, createBoardContainerTemplate(), `beforeend`);
const boardContainerElement = mainElement.querySelector(`.board, container`);
render(boardContainerElement, createSortTemplate(), `beforeend`);




// render(boardContainerElement, createFilterTemplate(), `beforeend`);
// render(boardContainerElement, createListOfTasksTemplate(), `beforeend`);
//
// const boardTasksElement = boardContainerElement.querySelector(`.board__tasks`);
// render(boardTasksElement, createEditFormTemplate(), `beforeend`);
//
// new Array(TASK_COUNT)
//   .fill(``)
//   .forEach(
//       () => {
//         render(boardTasksElement, createTaskTemplate(), `beforeend`);
//       }
//   );
//
// render(boardContainerElement, createLoadButtonTemplate(), `beforeend`);
