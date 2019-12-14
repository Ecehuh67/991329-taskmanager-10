import LoadMoreButtonComponent from '../components/load-button';
import TaskEditComponent from '../components/task-edit';
import TaskComponent from '../components/task';
import TasksComponent from '../components/task-list';
import SortComponent from '../components/sort';
import NoTasksComponent from '../components/no-tasks';
import {render, remove, replace, RenderPosition} from '../utils/render';

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
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler(replacedEditToTask);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }
  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = TASK_COUNT_ON_START;
    tasks.slice(0, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount = showingTasksCount + TASK_COUNT_BY_BUTTON;

      tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
        return renderTask(taskListElement, task);
      });

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
