function ResumeEditor() {
    let currentResumeData = null;
    let currentTemplate = 'default';
    let currentResumeType = 'mechanical';
    let currentResumeId = null;

    function fillResumeContent(resumeData, template = 'default', resumeType = 'mechanical') {
        console.log("fillResumeContent 被调用", resumeData, template, resumeType);
        if (!resumeData) {
            console.error('Resume data is undefined');
            return;
        }
        currentResumeData = resumeData;
        currentTemplate = template;
        currentResumeType = resumeType;
        const resumeContent = document.getElementById('resume-content');
        const config = window.resumeTemplates[template];
        
        let content = `<div class="resume ${config.className}">`;
        content += config.sections.map(section => 
            window.sectionRenderers[section](resumeData, config.className)
        ).join('');
        content += '</div>';

        resumeContent.innerHTML = content;

        // 更新头像
        updateAvatarDisplay();

        // 重置所有可编辑元素和列表的标志
        document.querySelectorAll('.editable').forEach(el => {
            el.hasListener = false;
        });
        ['skills', 'intern-responsibilities', 'project-details', 'awards', 'traits'].forEach(listId => {
            const list = document.getElementById(listId);
            if (list) {
                list.hasAddItemButton = false;
            }
        });

        window.addEditableListeners();
        window.addAvatarUploadListener();
        window.addTemplateSelector();
        window.addResumeTypeSelector();

        // 更新模板选择器
        const templateSelector = document.getElementById('template-selector');
        if (templateSelector) {
            templateSelector.value = template;
        }

        // 更新简历类型选择器
        const resumeTypeSelector = document.getElementById('resume-type-selector');
        if (resumeTypeSelector) {
            resumeTypeSelector.value = resumeType;
        }
    }

    function updateAvatarDisplay() {
        const avatarContainer = document.querySelector('.avatar-container');
        if (avatarContainer) {
            const fullResumeData = window.resumeService.getResumeById(currentResumeId);
            if (fullResumeData && fullResumeData[currentResumeType] && fullResumeData[currentResumeType].avatar) {
                avatarContainer.innerHTML = `<img src="${fullResumeData[currentResumeType].avatar}" alt="头像" class="avatar">`;
            } else {
                avatarContainer.innerHTML = `<div class="avatar-placeholder">添加头像</div>`;
            }
        }
    }

    function saveCurrentResume() {
        const updatedResume = window.resumeService.getResumeById(currentResumeId);
        if (!updatedResume) {
            console.error('Cannot find resume with id:', currentResumeId);
            return;
        }

        // 更新简历名称和标题
        const nameElement = document.getElementById('name');
        const titleElement = document.getElementById('title');
        if (nameElement) updatedResume.name = nameElement.innerText;
        if (titleElement) updatedResume.title = titleElement.innerText;

        // 更新当前简历类型的数据
        updatedResume[currentResumeType] = { ...getCurrentResumeData() };
        
        // 清空所有可能包含多个项目的数组
        const arrayFields = ['skills', 'intern-responsibilities', 'project-details', 'awards', 'traits'];
        arrayFields.forEach(field => {
            updatedResume[currentResumeType][field] = [];
        });

        // 保存所有可编辑字段
        document.querySelectorAll('.editable').forEach(el => {
            if (el.id) {
                updatedResume[currentResumeType][el.id] = el.innerText;
            } else if (el.parentElement && el.parentElement.id) {
                // 处理列表项
                const parentId = el.parentElement.id;
                if (arrayFields.includes(parentId)) {
                    if (!updatedResume[currentResumeType][parentId]) {
                        updatedResume[currentResumeType][parentId] = [];
                    }
                    updatedResume[currentResumeType][parentId].push(el.innerText);
                }
            }
        });

        // 保存头像数据
        const avatarImg = document.querySelector('.avatar');
        if (avatarImg) {
            updatedResume[currentResumeType].avatar = avatarImg.src;
        }

        // 保存当前选择的模板和类型
        updatedResume.template = currentTemplate;
        updatedResume.type = currentResumeType;

        window.resumeService.saveResume(updatedResume);
        window.showNotification('保存成功', '您的简历已成功保存。');
        
        // 重新加载简历列表以反映更改
        window.resumeList.loadResumeList();
    }

    function getCurrentResumeData() {
        return currentResumeData || {
            name: '',
            title: '',
            phone: '',
            email: '',
            address: '',
            school: '',
            major: '',
            degree: '',
            'edu-time': '',
            gpa: '',
            courses: '',
            skills: [],
            company: '',
            position: '',
            'intern-time': '',
            'intern-responsibilities': [],
            'project-name': '',
            'project-type': '',
            'project-time': '',
            'project-details': [],
            awards: [],
            traits: []
        };
    }

    function getCurrentResumeId() {
        return currentResumeId;
    }

    function getCurrentResumeType() {
        return currentResumeType;
    }

    function init() {
        console.log("ResumeEditor init function called");
        window.addTemplateSelector();
        window.addResumeTypeSelector();
        window.addScrollListener();

        // 添加头像上传按钮的事件监听器
        const addAvatarBtn = document.getElementById('add-avatar-btn');
        if (addAvatarBtn) {
            addAvatarBtn.addEventListener('click', window.triggerAvatarUpload);
        }

        // 添加保存按钮的事件监听器
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => saveCurrentResume());
        }

        // 添加下载PDF按钮的事件监听器
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', window.downloadPDF);
        }

        // 添加返回列表按钮的事件监听器
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                document.getElementById('resume-editor').style.display = 'none';
                document.getElementById('resume-manager').style.display = 'block';
            });
        }

        // 添加高级编辑按钮的事件监听器
        const advancedEditBtn = document.getElementById('advanced-edit-btn');
        if (advancedEditBtn) {
            advancedEditBtn.addEventListener('click', () => {
                if (window.AdvancedEditor && typeof window.AdvancedEditor.showAdvancedEditor === 'function') {
                    window.AdvancedEditor.showAdvancedEditor(currentResumeId);
                } else {
                    console.error('AdvancedEditor or showAdvancedEditor method not found');
                }
            });
        }

        // 添加高级编辑的应用按钮事件监听器
        const applyJsonBtn = document.getElementById('apply-json-btn');
        if (applyJsonBtn) {
            applyJsonBtn.addEventListener('click', () => {
                if (window.AdvancedEditor && typeof window.AdvancedEditor.applyJsonChanges === 'function') {
                    window.AdvancedEditor.applyJsonChanges(currentResumeId);
                } else {
                    console.error('AdvancedEditor or applyJsonChanges method not found');
                }
            });
        }

        // 添加高级编辑的取消按钮事件监听器
        const cancelAdvancedEditBtn = document.getElementById('cancel-advanced-edit-btn');
        if (cancelAdvancedEditBtn) {
            cancelAdvancedEditBtn.addEventListener('click', () => {
                if (window.AdvancedEditor && typeof window.AdvancedEditor.cancelEdit === 'function') {
                    window.AdvancedEditor.cancelEdit();
                } else {
                    console.error('AdvancedEditor or cancelEdit method not found');
                }
            });
        }

        // 添加头像上传input的事件监听器
        const avatarInput = document.getElementById('avatar-input');
        if (avatarInput) {
            avatarInput.addEventListener('change', (event) => window.handleAvatarUpload(event));
        }
    }

    // 在 DOMContentLoaded 事件中调用 init
    document.addEventListener('DOMContentLoaded', init);

    function updateTemplate(newTemplate) {
        currentTemplate = newTemplate;
        const fullResumeData = window.resumeService.getResumeById(currentResumeId);
        const resumeData = fullResumeData[currentResumeType] || window.defaultResumeData[currentResumeType];
        fillResumeContent(resumeData, currentTemplate, currentResumeType);
    }

    function updateResumeType(newResumeType) {
        currentResumeType = newResumeType;
        const fullResumeData = window.resumeService.getResumeById(currentResumeId);
        const resumeData = fullResumeData[newResumeType] || window.defaultResumeData[newResumeType];
        fillResumeContent(resumeData, currentTemplate, currentResumeType);
    }

    function setCurrentResumeId(id) {
        currentResumeId = id;
    }

    return {
        fillResumeContent,
        saveCurrentResume,
        getCurrentResumeData,
        getCurrentResumeId,  // 添加这行
        init,  // 确保这里返回了 init 方法
        updateTemplate,
        updateResumeType,
        setCurrentResumeId,
        updateAvatarDisplay  // 添加这行
    };
}

window.ResumeEditor = ResumeEditor();
console.log("ResumeEditor created and assigned to window");