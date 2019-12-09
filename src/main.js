import BoardComponent from './components/board.js';
import SortComponent from './components/sort.js';
import TasksComponent from './components/task-list.js';
import NoTasksComponent from './components/no-task.js';
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

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replacedEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replacedEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replacedEditToTask);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
}

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const isAllTasksArchived = tasks.every((task) => task.isArchive);
if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = TASK_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASK_COUNT_BY_BUTTON;

    tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
      return renderTask(taskListElement, task);
    });

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
