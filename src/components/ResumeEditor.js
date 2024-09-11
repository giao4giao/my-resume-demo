function ResumeEditor() {
    let currentResumeData = null;
    let currentTemplate = 'default';

    function fillResumeContent(resumeData, template = 'default') {
        currentResumeData = resumeData;
        currentTemplate = template;
        const resumeContent = document.getElementById('resume-content');
        const config = window.resumeTemplates[template];
        
        let content = `<div class="resume ${config.className}">`;
        content += config.sections.map(section => 
            window.sectionRenderers[section](currentResumeData, config.className)
        ).join('');
        content += '</div>';

        resumeContent.innerHTML = content;

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

        addEditableListeners();
        addAvatarUploadListener();
        addTemplateSelector(); // 确保每次填充内容时都添加模板选择器

        // 确保所有字段都显示，即使不在当前模板中
        Object.keys(currentResumeData).forEach(key => {
            const element = document.getElementById(key);
            if (element && currentResumeData[key]) {
                if (Array.isArray(currentResumeData[key])) {
                    element.innerHTML = currentResumeData[key].map(item => `<li class="editable">${item}</li>`).join('');
                } else {
                    element.innerText = currentResumeData[key];
                }
            }
        });

        // 更新模板选择器
        const templateSelector = document.getElementById('template-selector');
        if (templateSelector) {
            templateSelector.value = template;
        }
    }

    function addTemplateSelector() {
        const editorControls = document.getElementById('editor-controls');
        if (!editorControls) {
            console.error('editor-controls element not found');
            return;
        }

        // 检查是否已经存在模板选择器
        if (!document.getElementById('template-selector')) {
            const selectorHtml = `
                <select id="template-selector">
                    ${Object.keys(window.resumeTemplates).map(key => 
                        `<option value="${key}">${key.charAt(0).toUpperCase() + key.slice(1)} 模板</option>`
                    ).join('')}
                </select>
            `;
            editorControls.insertAdjacentHTML('afterbegin', selectorHtml);
            
            document.getElementById('template-selector').addEventListener('change', function(e) {
                const selectedTemplate = e.target.value;
                fillResumeContent(currentResumeData, selectedTemplate);
            });
        }
    }

    function getCurrentResumeData() {
        if (currentResumeData) {
            return currentResumeData;
        }
        // 如果没有当前简历数据,则返回默认结构
        return {
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

    function addEditableListeners() {
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
    }

    function addAvatarUploadListener() {
        const addAvatarBtn = document.getElementById('add-avatar-btn');
        addAvatarBtn.addEventListener('click', triggerAvatarUpload);
    }

    function triggerAvatarUpload() {
        document.getElementById('avatar-input').click();
    }

    function handleAvatarUpload(event, currentResumeId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                compressImage(e.target.result, function(compressedDataUrl) {
                    updateAvatar(compressedDataUrl, currentResumeId);
                    saveCurrentResume(currentResumeId);
                });
            };
            reader.readAsDataURL(file);
        }
    }

    function compressImage(dataUrl, callback) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 设置压缩后的尺寸
            const maxWidth = 200;
            const maxHeight = 200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            
            // 压缩图片质量
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
            callback(compressedDataUrl);
        };
        img.src = dataUrl;
    }

    function updateAvatar(avatarDataUrl, currentResumeId) {
        const resumeHeader = document.querySelector('.resume-header');
        const avatarContainer = resumeHeader.querySelector('.avatar-container');
        
        if (avatarContainer) {
            avatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
        } else {
            const newAvatarContainer = document.createElement('div');
            newAvatarContainer.className = 'avatar-container';
            newAvatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
            resumeHeader.insertBefore(newAvatarContainer, resumeHeader.firstChild);
        }
        
        // 更新当前简历数据
        currentResumeData.avatar = avatarDataUrl;
    }

    function saveCurrentResume(currentResumeId) {
        const updatedResume = { ...getCurrentResumeData() };
        
        // 清空所有可能包含多个项目的数组
        const arrayFields = ['skills', 'intern-responsibilities', 'project-details', 'awards', 'traits'];
        arrayFields.forEach(field => {
            updatedResume[field] = [];
        });

        // 保存所有可编辑字段
        document.querySelectorAll('.editable').forEach(el => {
            if (el.id) {
                updatedResume[el.id] = el.innerText;
            } else if (el.parentElement && el.parentElement.id) {
                // 处理列表项
                const parentId = el.parentElement.id;
                if (arrayFields.includes(parentId)) {
                    updatedResume[parentId].push(el.innerText);
                }
            }
        });

        // 特殊处理项目经验
        const projectSections = document.querySelectorAll('.project-section');
        updatedResume.projects = Array.from(projectSections).map(section => {
            return {
                'project-name': section.querySelector('#project-name').innerText,
                'project-type': section.querySelector('#project-type').innerText,
                'project-time': section.querySelector('#project-time').innerText,
                'project-details': Array.from(section.querySelectorAll('#project-details li')).map(li => li.innerText)
            };
        });

        // 保存头像数据
        const avatarImg = document.querySelector('.avatar');
        if (avatarImg) {
            updatedResume.avatar = avatarImg.src;
        }

        // 保存当前选择的模板
        updatedResume.template = currentTemplate;

        updatedResume.id = currentResumeId; // 确保ID保持不变
        currentResumeData = updatedResume;
        window.resumeService.saveResume(updatedResume);
        showNotification('保存成功', '您的简历已成功保存。');
    }

    function showNotification(title, message) {
        const modal = document.getElementById('notification-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const closeBtn = modal.querySelector('.close-modal');

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'block';

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // 3秒后自动关闭
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    }

    async function downloadPDF() {
        const resumeContent = document.getElementById('resume-content');
        if (!resumeContent) {
            console.error('Resume content element not found');
            alert('无法找到简历内容，请确保简历已正确加载。');
            return;
        }
        try {
            console.log('Starting PDF download');
            
            // 临时移除"添加新项"按钮
            const addItemButtons = resumeContent.querySelectorAll('.add-item-btn');
            addItemButtons.forEach(btn => btn.style.display = 'none');

            const pdf = await window.generatePDF(resumeContent);
            
            // 恢复"添加新项"按钮
            addItemButtons.forEach(btn => btn.style.display = '');

            console.log('PDF generated, saving...');
            pdf.save('我的简历.pdf');
            console.log('PDF saved');
        } catch (error) {
            console.error('生成PDF时发生错误:', error);
            alert(`生成PDF时发生错误: ${error.message}\n请查看控制台以获取更多信息。`);
        }
    }

    // 将 addTemplateSelector 移到这里
    document.addEventListener('DOMContentLoaded', function() {
        addTemplateSelector();
    });

    return {
        fillResumeContent,
        saveCurrentResume,
        downloadPDF,
        triggerAvatarUpload,
        handleAvatarUpload,
        getCurrentResumeData,
        updateAvatar,
        addTemplateSelector,
        showNotification // 添加这行
    };
}

window.ResumeEditor = ResumeEditor;