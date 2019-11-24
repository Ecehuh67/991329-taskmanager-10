import {createMenuTemplate} from './components/menu.js';
import {createControlTemplate} from './components/control.js';
import {createBoardContainerTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskTemplate} from './components/task.js';
import {createEditFormTemplate} from './components/task-edit.js';
import {createLoadButtonTemplate} from './components/load-button.js';
import {createListOfTasksTemplate} from './components/task-list.js';

const TASK_COUNT = 3; // amount of card which needs rendering

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, createMenuTemplate(), `beforeend`);
render(mainElement, createControlTemplate(), `beforeend`);
render(mainElement, createBoardContainerTemplate(), `beforeend`);

const boardContainerElement = mainElement.querySelector(`.board, container`);
render(boardContainerElement, createFilterTemplate(), `beforeend`);
render(boardContainerElement, createListOfTasksTemplate(), `beforeend`);

const boardTasksElement = boardContainerElement.querySelector(`.board__tasks`);
render(boardTasksElement, createEditFormTemplate(), `beforeend`);

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => {
        render(boardTasksElement, createTaskTemplate(), `beforeend`);
      }
  );

render(boardContainerElement, createLoadButtonTemplate(), `beforeend`);
