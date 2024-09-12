const ResumeEditor = {
    currentResumeId: null,
    currentTemplate: 'default',
    currentResumeType: 'mechanical',
    currentResumeData: {},

    init: function() {
        console.log("ResumeEditor init function called");
        this.addEventListeners();
        window.addTemplateSelector();
        window.addResumeTypeSelector();
        window.addScrollListener();
    },

    addEventListeners: function() {
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveCurrentResume());
        }

        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', window.downloadPDF);
        }

        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', this.backToList.bind(this));
        }

        const advancedEditBtn = document.getElementById('advanced-edit-btn');
        if (advancedEditBtn) {
            advancedEditBtn.addEventListener('click', this.showAdvancedEditor.bind(this));
        }

        const addAvatarBtn = document.getElementById('add-avatar-btn');
        if (addAvatarBtn) {
            addAvatarBtn.addEventListener('click', () => {
                console.log('Add avatar button clicked');
                if (typeof window.triggerAvatarUpload === 'function') {
                    window.triggerAvatarUpload();
                } else {
                    console.error('triggerAvatarUpload function not found');
                }
            });
        } else {
            console.error('Add avatar button not found');
        }

        const avatarInput = document.getElementById('avatar-input');
        if (avatarInput) {
            avatarInput.addEventListener('change', (event) => {
                console.log('Avatar input changed');
                if (typeof window.handleAvatarUpload === 'function') {
                    window.handleAvatarUpload(event);
                } else {
                    console.error('handleAvatarUpload function not found');
                }
            });
        } else {
            console.error('Avatar input not found');
        }
    },

    fillResumeContent: function(resumeData, template, resumeType) {
        console.log("fillResumeContent 被调用", resumeData, template, resumeType);
        this.currentTemplate = template;
        this.currentResumeType = resumeType;
        this.currentResumeData = resumeData;
        const resumeContent = document.getElementById('resume-content');
        resumeContent.className = template;
        
        const templateConfig = window.resumeTemplates[template];
        let html = '';
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];
        
        templateConfig.sections.forEach(section => {
            if (window.sectionRenderers[section]) {
                try {
                    html += window.sectionRenderers[section](resumeData, template, translations);
                } catch (error) {
                    console.error(`Error rendering section ${section}:`, error);
                    html += `<div class="error-section">Error rendering ${section}</div>`;
                }
            }
        });
        
        resumeContent.innerHTML = html;
        
        // 确保头像被正确渲染
        this.updateAvatarDisplay(resumeData.avatar);
        
        // 更新选择器
        const templateSelector = document.getElementById('template-selector');
        if (templateSelector) templateSelector.value = template;
        
        const resumeTypeSelector = document.getElementById('resume-type-selector');
        if (resumeTypeSelector) resumeTypeSelector.value = resumeType;
        
        window.addEditableListeners();
        window.addScrollListener();

        // 更新"添加新项"按钮的文本
        const addItemButtons = document.querySelectorAll('.add-item-btn');
        addItemButtons.forEach(button => {
            button.textContent = translations.addNewItem;
        });
    },

    saveCurrentResume: function() {
        const updatedResume = window.resumeService.getResumeById(this.currentResumeId);
        console.log('Saving resume:', updatedResume);
        if (!updatedResume) {
            console.error('Cannot find resume with id:', this.currentResumeId);
            return;
        }

        // 更新简历名称和标题
        const nameElement = document.getElementById('name');
        const titleElement = document.getElementById('title');
        if (nameElement) updatedResume.name = nameElement.innerText;
        if (titleElement) updatedResume.title = titleElement.innerText;

        // 更新当前简历类型的数据
        const currentData = this.getCurrentResumeData();
        updatedResume[this.currentResumeType] = { ...updatedResume[this.currentResumeType], ...currentData };
        
        // 保存头像数据
        if (updatedResume[this.currentResumeType].avatar) {
            console.log('Saving avatar data:', updatedResume[this.currentResumeType].avatar.substring(0, 50) + '...');
            const avatarContainer = document.querySelector('.avatar-container');
            if (avatarContainer) {
                avatarContainer.innerHTML = `<img src="${updatedResume[this.currentResumeType].avatar}" alt="头像" class="avatar">`;
            }
        } else {
            console.log('No avatar data to save');
        }

        // 保存当前选择的模板和类型
        updatedResume.template = this.currentTemplate;
        updatedResume.type = this.currentResumeType;

        window.resumeService.saveResume(updatedResume);
        console.log("Current resume saved with avatar:", updatedResume[this.currentResumeType].avatar ? "Yes" : "No");

        // 添加保存成功的通知
        const currentLang = localStorage.getItem('language') || 'zh';
        const translations = window.translations[currentLang];
        window.showNotification(translations.saveSuccess, translations.resumeSaved);

        // 添加这行来更新头像显示
        this.updateAvatarDisplay(updatedResume[this.currentResumeType].avatar);
    },

    getCurrentResumeData: function() {
        const resumeContent = document.getElementById('resume-content');
        const data = {};
        const editables = resumeContent.querySelectorAll('.editable');
        editables.forEach(el => {
            const key = el.id || el.parentElement.id;
            if (key) {
                if (el.tagName === 'UL') {
                    data[key] = Array.from(el.children).map(li => li.textContent);
                } else {
                    data[key] = el.textContent;
                }
            }
        });
        
        // 保留原有的头像数据
        const avatarImg = document.querySelector('.avatar');
        if (avatarImg && avatarImg.src) {
            data.avatar = avatarImg.src;
        }
        
        return data;
    },

    backToList: function() {
        document.getElementById('resume-editor').style.display = 'none';
        document.getElementById('resume-manager').style.display = 'block';
        window.resumeList.loadResumeList();
    },

    showAdvancedEditor: function() {
        if (window.AdvancedEditor && typeof window.AdvancedEditor.showAdvancedEditor === 'function') {
            window.AdvancedEditor.showAdvancedEditor(this.currentResumeId);
        } else {
            console.error('AdvancedEditor or showAdvancedEditor method not found');
        }
    },

    updateTemplate: function(newTemplate) {
        console.log("Updating template to:", newTemplate);
        this.currentTemplate = newTemplate;
        const fullResumeData = window.resumeService.getResumeById(this.currentResumeId);
        const resumeData = fullResumeData[this.currentResumeType] || window.defaultResumeData[this.currentResumeType];
        this.fillResumeContent(resumeData, this.currentTemplate, this.currentResumeType);
    },

    updateResumeType: function(newResumeType) {
        this.currentResumeType = newResumeType;
        const fullResumeData = window.resumeService.getResumeById(this.currentResumeId);
        const resumeData = fullResumeData[newResumeType] || window.defaultResumeData[newResumeType];
        this.fillResumeContent(resumeData, this.currentTemplate, this.currentResumeType);
    },

    setCurrentResumeId: function(id) {
        this.currentResumeId = id;
    },

    updateAvatarDisplay: function(dataUrl) {
        console.log('Updating avatar display with data:', dataUrl ? 'Data URL present' : 'No data URL');
        let avatarContainer = document.querySelector('.avatar-container');
        if (!avatarContainer) {
            console.log('Avatar container not found, creating one');
            avatarContainer = document.createElement('div');
            avatarContainer.className = 'avatar-container';
            const headerSection = document.querySelector('.resume-header');
            if (headerSection) {
                headerSection.insertBefore(avatarContainer, headerSection.firstChild);
            } else {
                console.error('Resume header not found');
                return;
            }
        }

        if (dataUrl) {
            // 如果有数据 URL，创建或更新 img 元素
            let avatarImg = avatarContainer.querySelector('.avatar');
            if (!avatarImg) {
                avatarImg = document.createElement('img');
                avatarImg.className = 'avatar';
                avatarContainer.innerHTML = ''; // 清空容器
                avatarContainer.appendChild(avatarImg);
            }
            avatarImg.src = dataUrl;
            avatarImg.style.display = 'block';
            console.log('Avatar image updated or created');
        } else {
            // 如果没有数据 URL，清空容器
            avatarContainer.innerHTML = '';
            console.log('Avatar container cleared');
        }
    },

    getCurrentResumeId: function() {
        return this.currentResumeId;
    },

    getCurrentResumeType: function() {
        return this.currentResumeType;
    },

    updateResumeData: function(key, value) {
        if (this.currentResumeId) {
            const resume = window.resumeService.getResumeById(this.currentResumeId);
            if (resume && resume[this.currentResumeType]) {
                resume[this.currentResumeType][key] = value;
                window.resumeService.saveResume(resume);
                console.log(`Updated ${key} in current resume`);
            }
        }
    }
};

// 确保 ResumeEditor 被添加到全局 window 对象
window.ResumeEditor = ResumeEditor;
console.log("ResumeEditor created and assigned to window");