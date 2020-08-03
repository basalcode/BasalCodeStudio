import sections from '../common/categoryList.js';

window.onload = function () {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);
    loadContents();
}

async function loadContents() {
    console.log('loadContents() has been loaded.');
    let isUpdated = false;
    window.addEventListener('beforeunload', function (event) {
        if (isUpdated) {
            event.preventDefault();
            event.returnValue = 'Exit';
        }
    });

    const DefaultTitle = {
        SECTION: 'New Section',
        CATEGORY: 'New Category'
    }
    
    let categoryList = document.querySelector('#category-list');
    let loadedSection = await sections;
    let sectionsElement = loadedSection.root;
    let defaultElement = loadedSection.defaultElement;
    let elements = loadedSection.elements;

    categoryList.appendChild(sectionsElement);

    let focusedElementObject = (function () {
        const defaultFocuse = defaultElement.section.querySelector('.section__self');

        let focusedElement = defaultFocuse;
        focusedElement.style.backgroundColor = 'blue';

        function setBackgroundColor(color) {
            focusedElement.style.backgroundColor = color
        }
        
        function setDefault() {
            focusedElement = defaultFocuse;
            setBackgroundColor('blue');
        }

        function isFocused(element) {
            return (focusedElement === element) ? true : false;
        }

        return {
            get value() { return focusedElement; },
            set value(newElement) {
                setBackgroundColor('');
                focusedElement = newElement;
                setBackgroundColor('blue');
            },
            setDefault: setDefault,
            isFocused: isFocused
        }
    })();

    function addElementTextModifyEvent(element) {
        let doubleClickLock = false;
        element.addEventListener('dblclick', function (event) {
            let currentTarget = event.target;
            if (!doubleClickLock) {
                doubleClickLock = true;
    
                let parentElement = currentTarget.parentNode;
    
                let originalNameField = currentTarget;
                let newNameField = document.createElement('input');
                newNameField.type = 'text';
    
                let titleText = originalNameField.innerText;
                let defaultTitle;
                if (originalNameField.className === 'section__title') {
                    defaultTitle = DefaultTitle.SECTION;
                } else {
                    defaultTitle = DefaultTitle.CATEGORY;
                }
    
                if (titleText !== defaultTitle) {
                    newNameField.value = titleText;
                }
                parentElement.replaceChild(newNameField, originalNameField);
    
                event.stopPropagation();
                newNameField.focus();
                let isFocused = true;
    
                newNameField.addEventListener('keydown', function (event) {
                    if (isFocused) {
                        const ApprovalKeys = {
                            ENTER: 'Enter',
                            NUMPAD_ENTER: 'NumpadEnter'
                        };
                        const CanselKey = {
                            ESC: 'Escape'
                        };
    
                        for (let key in ApprovalKeys) {
                            if (event.code === ApprovalKeys[key]) {
                                renameCategory(true);
                                return;
                            }
                        }
                        for (let key in CanselKey) {
                            if (event.code === CanselKey[key]) {
                                renameCategory(false);
                                return;
                            }
                        }
                    }
                });
    
                newNameField.addEventListener('blur', function (event) {
                    if (isFocused) {
                        renameCategory(true);
                    }
                });
    
                function renameCategory(apply) {
                    if (apply) {
                        let changedText = newNameField.value;
                        if (changedText.length === 0) {
                            changedText = defaultTitle;
                        }
                        originalNameField.innerText = changedText;
                    }
                    isFocused = false;
                    parentElement.replaceChild(originalNameField, newNameField);
                    doubleClickLock = false;
                }
            }
        });
    }

    function addFocusedContentEvent(element) {
        element.addEventListener('click', function (event) {
            let currentTarget = event.currentTarget;
            if (focusedElementObject.value !== currentTarget) {
                let originalElement = focusedElementObject.value;
                focusedElementObject.value = currentTarget;
                console.log('focused Changed', focusedElementObject.value);
            }
        })
    }

    addElementEvents(elements);
    addButtonEvents();

    function addElementEvents(elements) {
        let sectionLength = elements.section.length;
        let sectionSelf = elements.sectionSelf;
        let sectionTitle = elements.sectionTitle;

        for (let i = 0; i < sectionLength; i++) {
            addFocusedContentEvent(sectionSelf[i]);
            addElementTextModifyEvent(sectionTitle[i]);
        }

        let categoryLength = elements.category.length;
        let categorySelf = elements.categorySelf;
        let categoryTitle = elements.categoryTitle;

        for (let i = 0; i < categoryLength; i++) {
            addFocusedContentEvent(categorySelf[i]);
            addElementTextModifyEvent(categoryTitle[i]);
        }
    }

    function addButtonEvents() {
        addButtonEvent();
        removeContentButtonEvent();
        moveButtonEvent();
        applyContent();

        function addButtonEvent() {
            addSectionButtonEvent();
            addCategoryButtonEvent();
        
            
            function addSectionButtonEvent() {
                console.log('addSectionButtonEvent() has been loaded.');
                let addSectionButton = document.querySelector('#add-section');
                let lock = false;
                addSectionButton.addEventListener('click', function (event) {
                    if (!lock) {
                        lock = true;
                        isUpdated = true;
            
                        let section = document.createElement('div');
                        let self = document.createElement('div');
                        let title = document.createElement('div');
                        let categories = document.createElement('div');
            
                        section.className = 'section';
            
                        self.className = 'section__self';
            
                        title.className = 'section__title';
                        title.innerText = DefaultTitle.SECTION;
            
                        categories.className = 'section__categories';
            
                        section.appendChild(self);
                        self.appendChild(title)
            
                        section.appendChild(categories);
            
                        let target = focusedElementObject.value;
                        let sections = document.querySelector('#sections');
                        if (target.className === 'section__self') {
                            target.parentNode.parentNode.insertBefore(section, target.parentNode.nextSibling);
                        } else if (target.className === 'category__self') {
                            let targetParentSection = target.parentNode.parentNode.parentNode;
                            sections.insertBefore(section, targetParentSection.nextSibling);
                        } else {
                            sections.appendChild(section);
                        }
            
                        addElementTextModifyEvent(title);
                        addFocusedContentEvent(self);
            
                        lock = false;
                    }
                });
            }
            
            function addCategoryButtonEvent() {
                console.log('addCategoryButtonEvent() has been loaded.');
                let addCategoryButton = document.querySelector('#add-category');
                let lock = false;
                addCategoryButton.addEventListener('click', function (event) {
                    if (!lock) {
                        lock = true;
                        isUpdated = true;
            
                        let category = document.createElement('div');
                        let self = document.createElement('div');
                        let title = document.createElement('div');
            
                        category.className = 'category';
            
                        self.className = 'category__self';
            
                        title.className = 'category__title';
                        title.innerText = DefaultTitle.CATEGORY;
            
                        category.appendChild(self);
                        self.appendChild(title);
            
                        let target = focusedElementObject.value;
                        console.log(target);
                        if (target.className === 'section__self') {
                            let targetSection = target.parentNode;
                            let targetCategories = targetSection.querySelector('.section__categories');
                            targetCategories.appendChild(category);
                        } else if (target.className === 'category__self') {
                            let targetCategory = target.parentNode;
                            let targetCategories = targetCategory.parentNode;
                            targetCategories.insertBefore(category, targetCategory.nextSibling);
                        } else {
                            let defaultCategories = document.querySelector('#default-categories');
                            defaultCategories.appendChild(category);
                        }
            
                        addElementTextModifyEvent(title);
                        addFocusedContentEvent(self);
            
                        lock = false;
                    }
                });
            }
        }
        
        function removeContentButtonEvent() {
            console.log('removeContentButtonEvent() has been loaded.');
        
            let removeButton = document.querySelector('#remove');
            let lock = false;
            removeButton.addEventListener('click', function (event) {
                if (!lock) {
                    lock = true;
        
                    let target = focusedElementObject.value.parentNode;
                    let sections = document.querySelector('#sections');
                    let defaultSection = document.querySelector('#default-section');
                    let defaultCategory = document.querySelector('#default-category');
        
                    if (target === defaultSection || target === defaultCategory) {
                        alert(`Can\'t remove default content.`);
                    } else {
                        isUpdated = true;
        
                        if (target.className === 'section') {
                            let targetSection = target;
                            let targetCategories = targetSection.querySelector('.section__categories');
        
                            let defaultCategories = document.querySelector('#default-categories');
        
                            while (targetCategories.hasChildNodes()) {
                                let targetCategory = targetCategories.querySelector('.category');
                                defaultCategories.appendChild(targetCategory);
                            }
        
                            sections.removeChild(targetSection);
                        } else {
                            // It needs to implement post moving features in near future.
                            let targetCategories = target.parentNode;
                            targetCategories.removeChild(target);
                        }
                        focusedElementObject.setDefault();
                    }
                    lock = false;
                }
            });
        }
        
        function moveButtonEvent() {
            moveUpButtonEvent();
            moveDownButtonEvent();
        
            function moveUpButtonEvent() {
                let moveUpButton = document.querySelector('#move-up');
        
                let lock = false;
                moveUpButton.addEventListener('click', function (event) {
                    if (!lock) {
                        lock = true;
        
                        let targetElement = focusedElementObject.value.parentNode;
                        if (!isDefaultElement(targetElement)) {
                            let targetParentElement = targetElement.parentNode;
                            let previousElement = targetElement.previousSibling;
                            if (previousElement === null) {
                                if (targetElement.className === 'category') {
                                    let previousSection = targetElement.parentNode.
                                        parentNode.previousSibling;
                                    if (previousSection !== null) {
                                        let previousCategories = previousSection.querySelector('.section__categories');
                                        targetParentElement = previousCategories;
                                        previousCategories.appendChild(targetElement);
        
                                        isUpdated = true;
                                    }
                                }
                            } else {
                                if (!isDefaultElement(previousElement)) {
                                    targetParentElement.insertBefore(targetElement, previousElement);
        
                                    isUpdated = true;
                                } else {
                                    alert('Can\'t switch with default content.');
                                }
                            }
                        } else {
                            alert('Can\'t move with default content.');
                        }
        
                        lock = false;
                    }
                });
            }
        
            function moveDownButtonEvent() {
                let moveDownButton = document.querySelector('#move-down');
        
                let lock = false;
                moveDownButton.addEventListener('click', function (event) {
                    if (!lock) {
                        lock = true;
        
                        let targetElement = focusedElementObject.value.parentNode;
                        if (!isDefaultElement(targetElement)) {
                            let targetParentElement = targetElement.parentNode;
                            let nextElement = targetElement.nextSibling;
                            if (nextElement === null) { // 
                                if (targetElement.className === 'category') {
                                    let nextSection = targetElement.parentNode.parentNode.nextSibling;
                                    if (nextSection !== null) {
                                        let nextCategories = nextSection.querySelector('.section__categories');
                                        targetParentElement = nextCategories;
                                        nextCategories.insertBefore(targetElement, nextCategories.firstChild);
        
                                        isUpdated = true;
                                    }
                                }
                            } else {
                                let nextNextElement = nextElement.nextSibling;
                                if (!isDefaultElement(nextNextElement)) {
                                    targetParentElement.insertBefore(targetElement, nextNextElement);
        
                                    isUpdated = true;
                                } else {
                                    alert('Can\'t switch with default content.');
                                }
                            }
                        } else {
                            alert('Can\'t move with default content.');
                        }
        
                        lock = false;
                    }
                });
            }
        
            function isDefaultElement(verificationTarget) {
                let defaultElements = {
                    section: document.querySelector('#default-section'),
                    category: document.querySelector('#default-category')
                }
                let isDefault = false;
        
                for (let key in defaultElements) {
                    let defaultElement = defaultElements[key];
        
                    if (defaultElement === verificationTarget) {
                        isDefault = true;
                    }
                }
                return isDefault;
            }
        }
        
        function applyContent() {
            console.log('applyContent() has been loaded.');
            let applyButton = document.querySelector('#apply');
            let lock = false;
            applyButton.addEventListener('click', function (event) {
                if (!lock) {
                    lock = true;
                    if (isUpdated) {
                        let updateConfirm = confirm('Sure you want update?');
                        if (updateConfirm) {
                            let sections = document.querySelector('#sections');
                            let sectionsLength = sections.childElementCount;
        
                            let cloneSections = {};
                            for (let i = 0; i < sectionsLength; i++) {
                                let section = sections.childNodes[i];
                                let sectionTitle = section.querySelector('.section__title').innerText;
        
                                cloneSections[i] = {};
                                cloneSections[i].name = sectionTitle;
                                cloneSections[i].categories = {};
        
                                let categories = section.querySelector('.section__categories');
                                let categoriesLength = categories.childElementCount;
        
                                for (let j = 0; j < categoriesLength; j++) {
                                    let category = categories.childNodes[j];
                                    let categoryTitle = category.querySelector('.category__title').innerText;
        
                                    cloneSections[i].categories[j] = {};
                                    cloneSections[i].categories[j].name = categoryTitle;
                                }
                            }
        
                            fetch(`/request/blog/update/categoryEditor`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    categoryEditor: cloneSections
                                })
                            })
                                .then(function (response) {
                                    return response.json();
                                })
                                .then(function (parsed) {
                                    console.log('[From Server]', parsed);
                                    alert('Successfully updated!');
                                    isUpdated = false;
                                    lock = false;
                                })
                        }
                    } else {
                        alert('There is no change.');
                        lock = false;
                    }
                }
            });
        }
    }
}