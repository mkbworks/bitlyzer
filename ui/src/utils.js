function addToClass(classList, className) {
    let classes = classList.trim().split(" ");
    classes = classes.filter(classItem => classItem.trim().length !== 0);
    classes.push(className.trim());
    return classes.join(" ");
}

export { addToClass };
