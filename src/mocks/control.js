const controlsNames = [`all`, `overdue`, `today`, `fovorites`, `repeating`, `tags`, `archive`];

const generateControls = (tasks) => {

  const currentDate = new Date();
  let index = 0;

  return controlsNames.map((it) => {
    switch (it) {
      case `all`:
        index = tasks.length;
        break;
      case `overdue`:
        index = tasks.filter((task) => {
          return (task.dueDate ? task.dueDate.getDate() : `null`) < currentDate.getDate();
        }).length;
        break;
      case `today`:
        index = tasks.filter(
            (task) => {
              return (task.dueDate ? task.dueDate.getDate() : `null`) === currentDate.getDate();
            }).length;
        break;
      case `favorites`:
        index = tasks.filter(
            (task) => {
              return task.isFavorite;
            }).length;
        break;
      case `archive`:
        index = tasks.filter(
            (task) => {
              return task.isArchive;
            }).length;
        break;
      case `repeating`:
        index = tasks.filter(
            (task) => {
              return Object.values(task.repeatingDays).some(Boolean);
            }).length;
        break;
      case `tags`:
        index = tasks.filter(
            (task) => {
              return Array.from(task.tags).length > 0;
            }).length;
    }

    return {
      title: it,
      count: index
    };
  });
};

export {
  generateControls
};
