window.addEditableListeners = function() {
    const editables = document.querySelectorAll('.editable');
    const currentLang = localStorage.getItem('language') || 'zh';
    const translations = window.translations[currentLang];

    editables.forEach(el => {
        if (!el.hasListener) {
            el.hasListener = true;
            el.addEventListener('focus', function(event) {
                // 获取当前字段的默认提示文本
                const defaultText = translations[`add${el.id.charAt(0).toUpperCase() + el.id.slice(1)}`] || translations.addSelfEvaluation;
                if (this.textContent.trim() === defaultText) {
                    this.textContent = '';
                }
            });
            el.addEventListener('blur', function(event) {
                // 如果内容为空，则在失去焦点时恢复默认提示文本
                if (this.textContent.trim() === '') {
                    const defaultText = translations[`add${el.id.charAt(0).toUpperCase() + el.id.slice(1)}`] || translations.addSelfEvaluation;
                    this.textContent = defaultText;
                }
            });
        }
    });

    // 为可编辑列表添加新项的功能
    const editableLists = ['skills', 'intern-responsibilities', 'project-details', 'awards', 'traits'];
    
    editableLists.forEach(listId => {
        const list = document.getElementById(listId);
        if (list && !list.hasAddItemButton) {
            list.hasAddItemButton = true;
            const addItemBtn = document.createElement('button');
            addItemBtn.textContent = translations.addNewItem;
            addItemBtn.className = 'add-item-btn';
            addItemBtn.addEventListener('click', function() {
                const newItem = document.createElement('li');
                newItem.className = 'editable';
                newItem.contentEditable = 'true';
                newItem.textContent = translations.clickToEdit;
                list.appendChild(newItem);
                // 为新添加的项绑定编辑事件监听器
                addEditableListeners();
            });
            list.parentNode.insertBefore(addItemBtn, list.nextSibling);
        }
    });
};

window.addScrollListener = function() {
    let lastScrollTop = 0;
    const editorControls = document.getElementById('editor-controls');
    const resumeContent = document.getElementById('resume-content');
    const controlsHeight = editorControls.offsetHeight;
    const initialMarginTop = 120; // 与 CSS 中的初始 margin-top 值保持一致

    window.addEventListener('scroll', function() {
        // 检查窗口宽度，只在非手机界面下执行滚动逻辑
        if (window.innerWidth > 768) {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop && currentScrollTop > controlsHeight) {
                // 向下滚动，隐藏控制面板
                editorControls.classList.add('hidden');
                resumeContent.style.marginTop = '20px';
            } else if (currentScrollTop < lastScrollTop || currentScrollTop <= controlsHeight) {
                // 向上滚动或回到顶部，显示控制面板
                editorControls.classList.remove('hidden');
                resumeContent.style.marginTop = `${initialMarginTop}px`;
            }

            lastScrollTop = currentScrollTop;
        }
    });
};