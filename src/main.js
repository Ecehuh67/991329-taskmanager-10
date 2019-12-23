import BoardComponent from './components/board';
import BoardController from './controllers/board';
import FilterComponent from './components/filter';
import SiteMenuComponent from './components/menu';
import {generateFilters} from './mocks/filter';
import {generateTasks} from './mocks/task';
import {render, RenderPosition} from './utils/render';

const TASK_COUNT = 20; // amount of card which needs rendering

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(mainControlElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(mainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(mainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
