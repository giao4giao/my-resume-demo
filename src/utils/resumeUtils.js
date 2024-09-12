window.addEditableListeners = function() {
    const editables = document.querySelectorAll('.editable');
    editables.forEach(el => {
        if (!el.hasListener) {
            el.hasListener = true;
            el.addEventListener('click', function(event) {
                // 防止事件冒泡到父元素
                event.stopPropagation();
                
                // 如果已经是输入状态，不做任何操作
                if (this.querySelector('input')) return;

                const text = this.innerText;
                const input = document.createElement('input');
                input.value = text;
                this.innerText = '';
                this.appendChild(input);
                input.focus();

                const saveChanges = () => {
                    const newText = input.value.trim();
                    if (newText) {
                        this.innerText = newText;
                    } else {
                        // 如果新文本为空，并且是列表项，则删除该项
                        if (this.tagName === 'LI') {
                            this.remove();
                        } else {
                            this.innerText = text; // 恢复原文本
                        }
                    }
                };

                input.addEventListener('blur', saveChanges);
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        saveChanges();
                    }
                });
            });
        }
    });

    // 为可编辑列表添加新项的功能
    const editableLists = ['skills', 'intern-responsibilities', 'project-details', 'awards', 'traits'];
    const currentLang = localStorage.getItem('language') || 'zh';
    const translations = window.translations[currentLang];
    
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
                newItem.textContent = translations.clickToEdit;
                list.appendChild(newItem);
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