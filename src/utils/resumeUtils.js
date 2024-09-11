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
    editableLists.forEach(listId => {
        const list = document.getElementById(listId);
        if (list && !list.hasAddItemButton) {
            list.hasAddItemButton = true;
            const addItemBtn = document.createElement('button');
            addItemBtn.textContent = '添加新项';
            addItemBtn.className = 'add-item-btn'; // 添加这个类名
            addItemBtn.addEventListener('click', function() {
                const newItem = document.createElement('li');
                newItem.className = 'editable';
                newItem.textContent = '点击编辑';
                list.appendChild(newItem);
                addEditableListeners(); // 只为新添加的项添加事件监听器
            });
            list.parentNode.insertBefore(addItemBtn, list.nextSibling);
        }
    });
};

window.addScrollListener = function() {
    let lastScrollTop = 0;
    let isHidden = false;
    const originalMarginTop = 140; // 设置一个固定的原始顶部边距值

    window.addEventListener('scroll', function() {
        const editorControls = document.getElementById('editor-controls');
        const selectorContainer = document.getElementById('selector-container');
        const resumeContent = document.getElementById('resume-content');
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop && !isHidden) {
            // 向下滚动,隐藏选择器
            selectorContainer.classList.add('hidden');
            editorControls.style.paddingTop = '10px';
            editorControls.style.paddingBottom = '10px';
            resumeContent.style.marginTop = '70px';
            isHidden = true;
        } else if (currentScrollTop < lastScrollTop && isHidden) {
            // 向上滚动,显示选择器
            selectorContainer.classList.remove('hidden');
            editorControls.style.paddingTop = '10px';
            editorControls.style.paddingBottom = '10px';
            resumeContent.style.marginTop = originalMarginTop + 'px'; // 恢复原始边距
            isHidden = false;
        }

        lastScrollTop = currentScrollTop;

        // 清除之前的超时
        clearTimeout(timeout);

        // 设置新的超时
        timeout = setTimeout(function() {
            selectorContainer.classList.remove('hidden');
            editorControls.style.paddingTop = '10px';
            editorControls.style.paddingBottom = '10px';
            resumeContent.style.marginTop = originalMarginTop + 'px'; // 恢复原始边距
            isHidden = false;
        }, 1000); // 1秒后显示选择器
    });
};