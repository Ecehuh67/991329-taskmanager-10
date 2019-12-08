import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-button.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import SiteMenuComponent from './components/menu.js';
import {generateFilters} from './mocks/filter.js';
import {generateTasks} from './mocks/task.js';
import {render, RenderPosition} from './mocks/utils.js';

const TASK_COUNT = 20; // amount of card which needs rendering
const TASK_COUNT_ON_START = 9;
const TASK_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
}

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent().getElement();
render(mainElement, boardComponent, RenderPosition.BEFOREEND);

const taskListElement = boardComponent.querySelector(`.board__tasks`);

let showingTasksCount = TASK_COUNT_ON_START;
tasks.slice(0, showingTasksCount).forEach((task) => renderTask(task));
const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + TASK_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
    return render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND);
  });

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
