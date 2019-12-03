const LIMIT_OF_TIME = 7; // Max difference of days from task's date
const TAGS_AMOUNT = 3;
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

// A list of captions of task
const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const Tags = [
  `homework`,
  `theory`,
  `practise`,
  `intensive`,
  `keks`
];

// A function for generating random number from parametrs of function
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// A function which will choose random Array's item
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  // 50% chance randomly generate minus or plus
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, LIMIT_OF_TIME);

  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    [getRandomArrayItem(Object.keys(DefaultRepeatingDays))]: Math.random() > 0.5
  });
};

// randomly generate list of tags from the parameter
const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, TAGS_AMOUNT);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
