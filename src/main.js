import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {generateFilters} from './mocks/filter.js';
import {generateTasks} from './mocks/task.js';
import {createSortTemplate} from './components/sort.js';
import {createBoardContainerTemplate} from './components/board.js';
import {createListOfTasksTemplate} from './components/task-list.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadButtonTemplate} from './components/load-button.js';

const TASK_COUNT = 20; // amount of card which needs rendering
const TASK_COUNT_ON_START = 9;
const TASK_COUNT_BY_BUTTON = 8;

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
render(boardContainerElement, createListOfTasksTemplate(), `beforeend`);
const boardTasksElement = boardContainerElement.querySelector(`.board__tasks`);

render(boardTasksElement, createTaskEditTemplate(tasks[0]), `beforeend`);
let showingTasksCount = TASK_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(boardTasksElement, createTaskTemplate(task), `beforeend`));
render(boardContainerElement, createLoadButtonTemplate(), `beforeend`);

const loadMoreButton = mainElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + TASK_COUNT_BY_BUTTON;

  console.log(showingTasksCount);
  console.log(tasks.length);

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
    return render(boardTasksElement, createTaskTemplate(task), `beforeend`);
  });

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
